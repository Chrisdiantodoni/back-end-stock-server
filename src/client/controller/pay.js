const projectModel = require("../../models/project");
const { Op } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const stockModel = require("../../models/stock");
const projectStockModel = require("../../models/project_stock");
const approvalProjectModel = require("../../models/approval_project");
const payModel = require("../../models/pay_project");
const pay_detail = require("../../models/pay_detail");
const payProject = require("../../models/pay_project");
const progress_image = require("../../models/progress_image");
const tukang = require("../../models/tukang");
const tukang_time = require("../../models/tukang_time");
const { getPagination, getPagingData } = paging;
const { fullURL, pathProgress } = require("../../../utils/url");
const jobModel = require("../../models/job");
const approval_pay = require("../../models/approval_pay");
const job = require("../../models/job");
const upah_tukang = require("../../models/upah_tukang");

class controllerPay {
  async getListPay(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "nama_project",
      query = "",
      start = "",
      end = "",
      status = "",
    } = req.query;
    console.log(query);
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

      if (start && end) {
        whereClause.createdAt = {
          [Op.between]: [start, end],
        };
      }
      const whereStatusClause = {
        [Op.or]: [
          {
            status: {
              [Op.like]: `%${status}%`,
            },
          },
        ],
      };

      const { limit, offset } = getPagination(page, size);

      let getListPay = await payModel.findAndCountAll({
        limit,
        offset,
        order: [["status", "DESC"]],
        where: whereStatusClause,
        include: [
          {
            model: projectModel,
            as: "project",
            where: whereClause,
          },
        ],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getListPay, page, limit),
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getHistoryPay(req, res) {
    const { id } = req.params;
    try {
      const getHistoryPay = await payModel.findAll({
        where: {
          projectId: id,
          status: "sudah",
        },
        include: [
          {
            model: pay_detail,
            as: "pay_details",
          },
        ],
      });

      responseJSON({
        res,
        status: 200,
        data: getHistoryPay,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async PayDaily(req, res) {
    const { id } = req.params;
    const { approvalType, userId, comments, status } = req.body;
    try {
      await payModel
        .findOne({
          where: {
            id,
          },
        })
        .then(async (res) => {
          res.update({
            approvalType,
            status: approvalType === "Finance" || "Admin" ? "sudah" : "belum",
          });
          await approval_pay.create({
            userId,
            comments,
            payId: id,
            status,
          });
        });
      responseJSON({
        res,
        status: 200,
        data: "Updated",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async PayWeekly(req, res) {
    const { id } = req.params;
    const { approvalType, userId, comments, status } = req.body;
    try {
      await payModel
        .findOne({
          where: {
            id,
          },
        })
        .then(async (res) => {
          res.update({
            approvalType,
            status: "belum",
          });
          if (approvalType === "Finance") {
            res.update({
              status: "sudah",
            });
          }
          await approval_pay.create({
            userId,
            comments,
            payId: id,
            status,
          });
        });
      responseJSON({
        res,
        status: 200,
        data: "Updated",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getPayDetailDaily(req, res) {
    const { id } = req.params;
    try {
      const getDetail = await payProject.findOne({
        where: {
          id,
        },
        include: [
          {
            model: projectModel,
            as: "project",
          },
        ],
      });

      const getTukang = await tukang.findAll({
        include: [
          {
            model: tukang_time,
            as: "tukang_times",
            where: {
              payProjectId: id,
            },
          },
          {
            model: upah_tukang,
            as: "upah_tukangs",
            where: {
              projectId: getDetail?.dataValues?.projectId,
            },
          },
        ],
      });
      const getImages = await progress_image.findAll({
        raw: true,
      });
      const jobIds = getDetail.project.jobId.split(",");
      const getJob = await jobModel.findAll({
        raw: true,
      });

      const tukangIds = getDetail.dataValues?.tukangId.split(",");

      const gambarIds = getDetail.dataValues?.imageId.split(",");

      const matchingTukang = getTukang.filter((item) =>
        tukangIds.includes(String(item.id))
      );
      const matchingGambar = getImages.filter((gambar) =>
        gambarIds.includes(String(gambar.id))
      );
      const matchingJobs = getJob.filter((job) =>
        jobIds.includes(String(job.id))
      );

      let newData = {
        ...getDetail.dataValues,
        list_gambar: matchingGambar.map((item) => ({
          ...item,
          file_name: `${fullURL(req)}${pathProgress}/${item.file_name}`,
        })),
        list_tukang: matchingTukang,
        list_jobs: matchingJobs,
      };

      responseJSON({
        res,
        status: 200,
        data: newData,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async getPayDetailWeekly(req, res) {
    const { id } = req.params;
    try {
      let getDetail = await payProject.findOne({
        where: {
          id,
        },
        include: [
          {
            model: projectModel,
            as: "project",
          },
        ],
      });
      const getGambar = await progress_image.findAll({
        raw: true,
      });
      const getTukang = await tukang.findAll({
        raw: true,
      });

      const getProject = await projectModel.findOne({
        where: {
          id: getDetail?.projectId,
        },
        raw: true,
      });
      console.log(getProject);

      const gambarIds = getDetail.dataValues?.imageId.split(",");
      const tukangIds = getDetail.dataValues?.tukangId.split(",");
      const jobIds = getProject.jobId.split(",");
      const getJob = await jobModel.findAll({
        include: [
          {
            model: pay_detail,
            as: "pay_detail",
            where: {
              payProjectId: id,
            },
          },
        ],
      });
      const matchingGambar = getGambar.filter((gambar) =>
        gambarIds.includes(String(gambar.id))
      );
      const matchingTukang = getTukang.filter((tukang) =>
        tukangIds.includes(String(tukang.id))
      );
      const matchingJob = getJob.filter((job) =>
        jobIds.includes(String(job.id))
      );

      getDetail = {
        ...getDetail.dataValues,
        list_jobs: matchingJob,
        list_tukangs: matchingTukang,
        list_gambar: matchingGambar.map((item) => ({
          ...item,
          file_name: `${fullURL(req)}${pathProgress}/${item.file_name}`,
        })),
      };
      responseJSON({
        res,
        status: 200,
        data: getDetail,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 500,
        data: error.message,
      });
    }
  }
}

module.exports = new controllerPay();
