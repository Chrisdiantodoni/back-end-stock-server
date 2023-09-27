const projectModel = require("../../models/project");
const { Op, where } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const { getPagination, getPagingData } = paging;
const jobModel = require("../../models/job");
const stockModel = require("../../models/stock");
const tukangModel = require("../../models/tukang");
const supplierModel = require("../../models/supplier");
const projectStockModel = require("../../models/project_stock");
const gambarModel = require("../../models/gambar");
const { fullURL, pathImage } = require("../../../utils/url");

class controllerProject {
  async createProject(req, res) {
    try {
      const {
        nama_project,
        userId,
        lokasi,
        tukangId,
        harga,
        start,
        end,
        status,
        list_stock = [],
        list_job = [],
        type,
        beli,
      } = req.body;
      console.log(req.files);
      const list_gambar = req.files;
      if (!req.files || !req.files.length) {
        return responseJSON({
          res,
          status: 400,
          data: "File must be uploaded!",
        });
      }

      const parsedListStock = JSON.parse(list_stock);
      const parsedListJob = JSON.parse(list_job);
      console.log(parsedListStock, parsedListJob);

      const createdStockPromises = parsedListStock.map(async (stock) => {
        const existingStockRecord = await stockModel.findOne({
          where: {
            id: stock.id,
          },
        });
        let existingStockId = null;
        let createdStockRecordId = null;
        if (existingStockRecord) {
          existingStockId = existingStockRecord.dataValues?.id;
        }
        const createdStockRecord = await projectStockModel.create({
          nama_barang: stock.nama_barang,
          qty: stock.qty,
          supplierId: stock.supplierId,
          harga: stock.harga,
          stockId: existingStockRecord?.id,
        });
        createdStockRecordId = createdStockRecord.id;
        const combinedIds = [existingStockId, createdStockRecordId]
          .filter(Boolean)
          .join(",");
        return combinedIds;
      });

      const createdGambarPromises = list_gambar.map(async (gambar) => {
        const createdImageRecord = await gambarModel.create({
          file_name: gambar.filename,
        });
        return createdImageRecord.id;
      });

      const createProject = await projectModel.create({
        nama_project,
        userId,
        lokasi,
        tukangId,
        start,
        end,
        status,
        harga,
        type,
      });

      const createdJobsPromises = parsedListJob.map(async (job) => {
        const createdJobRecord = await jobModel.create({
          name: job.name,
          qty: job.qty,
          harga: job.harga,
          projectId: createProject.id,
          tukangId: tukangId,
        });
        return createdJobRecord.id;
      });

      const createdStock = (await Promise.all(createdStockPromises)).join(",");
      const createdGambar = (await Promise.all(createdGambarPromises)).join(
        ","
      );
      const createdJobs = (await Promise.all(createdJobsPromises)).join(",");

      console.log(createdStock, createdGambar, createdJobs);

      // Update the created project with stock and gambar IDs
      await createProject.update({
        stockId: createdStock,
        jobId: createdJobs,
        gambarId: createdGambar,
      });

      responseJSON({
        res,
        status: 200,
        data: "project created",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 500,
        data: error.message,
      });
    }
  }
  async getDetailProject(req, res) {
    const { id } = req.params;
    try {
      let getProject = await projectModel.findOne({
        where: {
          id,
        },
      });
      const getStock = await projectStockModel.findAll({
        raw: true,
      });
      const getJob = await jobModel.findAll({
        raw: true,
      });
      const getTukang = await tukangModel.findAll({
        raw: true,
      });

      const stockIds = getProject.dataValues?.stockId.split(",");
      const jobIds = getProject.dataValues?.jobId.split(",");
      const tukangIds = getProject.dataValues?.tukangId.split(",");

      const matchingStock = getStock.filter((stock) =>
        stockIds.includes(String(stock.id))
      );
      const matchingJob = getJob.filter((job) =>
        jobIds.includes(String(job.id))
      );
      const matchingTukang = getTukang.filter((tukang) =>
        tukangIds.includes(String(tukang.id))
      );

      getProject = {
        ...getProject.dataValues,
        list_stock: matchingStock,
        list_jobs: matchingJob,
        list_tukangs: matchingTukang,
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

  async updateProject(req, res) {
    const { projectId } = req.params;
    const { status } = req.body;
    try {
      await projectModel.update(
        {
          status,
        },
        {
          where: {
            id: projectId,
          },
        }
      );
      responseJSON({
        res,
        status: 200,
        data: "Project Updated",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getProject(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "nama_project",
      query = "",
      status = "",
      start = "",
      end = "",
    } = req.query;
    console.log(req.query);
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
      };

      if (status !== "") {
        whereClause.status = {
          [Op.eq]: status,
        };
      }
      if (start && end) {
        whereClause.createdAt = {
          [Op.between]: [start, end],
        };
      }

      const getProject = await projectModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
      });
      const newData = {
        count: getProject.count,
        rows: getProject.rows.map((item) => ({
          ...item.dataValues,
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
}

module.exports = new controllerProject();
