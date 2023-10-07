const projectModel = require("../../models/project");
const { Op } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const { getPagination, getPagingData } = paging;
const jobModel = require("../../models/job");
const stockModel = require("../../models/stock");
const tukangModel = require("../../models/tukang");
const tukangTimeModel = require("../../models/tukang_time");
const supplierModel = require("../../models/supplier");
const projectStockModel = require("../../models/project_stock");
const gambarModel = require("../../models/gambar");
const { fullURL, pathImage } = require("../../../utils/url");
const payProjectModel = require("../../models/pay_project");
const progressImageModel = require("../../models/progress_image");
const payDetailModel = require("../../models/pay_detail");
const moment = require("moment/moment");

class progressController {
  async submissionPayDaily(req, res) {
    const {
      tukangId,
      projectId,
      list_time = [],
      status,
      approvalType,
    } = req.body;
    console.log(list_time);
    const list_image = req.files;
    try {
      const parsedListTime = JSON.parse(list_time);

      parsedListTime.map(async (time) => {
        await tukangTimeModel.create({
          tanggal_masuk: moment(time.tanggal_masuk),
          check_in: moment(time.check_in),
          check_out: moment(time.check_out),
          projectId: projectId,
          tukangId: time.tukangId,
        });
      });

      const createdGambarPromises = list_image.map(async (gambar) => {
        const createdImageRecord = await progressImageModel.create({
          file_name: gambar.filename,
        });
        return createdImageRecord.id;
      });

      const createdGambar = (await Promise.all(createdGambarPromises)).join(
        ","
      );
      const createPayment = await payProjectModel.create({
        tukangId,
        projectId,
        status,
        approvalType,
        imageId: createdGambar,
      });
      responseJSON({
        res,
        status: 201,
        data: createPayment,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async submissionPayWeekly(req, res) {
    const {
      tukangId,
      projectId,
      list_progress = [],
      status,
      approvalType,
    } = req.body;

    try {
      const list_image = req.files;
      const parsedListProgress = JSON.parse(list_progress);
      const createdGambarPromises = list_image.map(async (gambar) => {
        const createdImageRecord = await progressImageModel.create({
          file_name: gambar.filename,
        });
        return createdImageRecord.id;
      });
      const createdGambar = (await Promise.all(createdGambarPromises)).join(
        ","
      );
      console.log(createdGambar);
      const createPayment = await payProjectModel.create({
        tukangId,
        projectId,
        status,
        approvalType,
        imageId: createdGambar,
      });
      parsedListProgress.map(async (progress) => {
        await payDetailModel.create({
          name: progress.name,
          qty: progress.qty,
          harga: progress.harga,
          nominal: progress.nominal,
          percentage: progress.percentage,
          hasil_akhir: progress.hasil_akhir,
          payId: createPayment.id,
        });
      });

      responseJSON({
        res,
        status: 201,
        data: createPayment,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getProjectProgress(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "nama_project",
      query = "",
      start = "",
      end = "",
    } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
      const whereClause = {
        [Op.or]: [
          {
            [column_name]: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            nama_project: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
        status: "approved",
      };

      if (start && end) {
        whereClause.createdAt = {
          [Op.between]: [start, end],
        };
      }

      const projectOptions = {
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
      };

      const getProject = await projectModel.findAndCountAll(projectOptions);
      console.log(getProject);

      let jobIds = getProject.rows.map((item) => item.jobId);
      let tukangIds = getProject.rows.map((item) => item.tukangId);
      let stockIds = getProject.rows.map((item) => item.stockId);

      const matchingJobs = await jobModel.findAll({
        where: {
          id: jobIds,
        },
      });

      const matchingTukang = await tukangModel.findAll({
        where: {
          id: tukangIds,
        },
      });
      const matchingStock = await stockModel.findAll({
        where: {
          id: stockIds,
        },
      });

      const newData = {
        count: getProject.count,
        rows: getProject.rows.map((item) => ({
          ...item.dataValues,
          list_job: matchingJobs,
          list_tukang: matchingTukang,
          list_stock: matchingStock,
        })),
      };

      responseJSON({
        res,
        status: 200,
        data: getPagingData(newData, page, limit),
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getDetailProjectProgress(req, res) {
    const { id } = req.params;
    try {
      let getProject = await projectModel.findOne({
        where: {
          id,
        },
      });
      const getStock = await projectStockModel.findAll({
        include: [
          {
            model: supplierModel,
            as: "supplier",
          },
        ],
      });
      const getJob = await jobModel.findAll({
        raw: true,
      });
      const getTukang = await tukangModel.findAll({
        include: [
          {
            model: tukangTimeModel,
            as: "tukang_times",
            where: {
              projectId: id,
            },
          },
        ],
      });
      const getGambar = await gambarModel.findAll({
        raw: true,
      });
      const jobIds = getProject.dataValues?.jobId.split(",");
      const stockIds = getProject.dataValues?.stockId.split(",");
      const tukangIds = getProject.dataValues?.tukangId.split(",");
      const gambarIds = getProject.dataValues?.gambarId.split(",");

      const matchingStock = getStock.filter((stock) =>
        stockIds.includes(String(stock.id))
      );
      const matchingJob = getJob.filter((job) =>
        jobIds.includes(String(job.id))
      );
      const matchingTukang = getTukang.filter((tukang) =>
        tukangIds.includes(String(tukang.id))
      );
      const matchingGambar = getGambar.filter((gambar) =>
        gambarIds.includes(String(gambar.id))
      );

      console.log(matchingTukang);

      getProject = {
        ...getProject.dataValues,
        list_stock: matchingStock,
        list_jobs: matchingJob,
        list_tukangs: matchingTukang,
        list_gambar: matchingGambar.map((item) => ({
          ...item,
          file_name: `${fullURL(req)}${pathImage}/${item.file_name}`,
        })),
      };
      responseJSON({
        res,
        status: 200,
        data: getProject,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
}

module.exports = new progressController();
