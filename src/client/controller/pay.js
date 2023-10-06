const projectModel = require("../../models/project");
const { Op } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const stockModel = require("../../models/stock");
const projectStockModel = require("../../models/project_stock");
const approvalProjectModel = require("../../models/approval_project");
const payModel = require("../../models/pay_project");
const { getPagination, getPagingData } = paging;
class controllerPay {
  async getListPay(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "nama_project",
      query = "",
      start = "",
      end = "",
    } = req.query;
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

      const { limit, offset } = getPagination(page, size);

      const getListPay = await payModel.findAndCountAll({
        limit,
        offset,
        include: {
          model: projectModel,
          as: "project",
          where: whereClause,
        },
      });

      const newData = {
        count: getListPay.count,
        rows: getListPay.rows.map((item) => ({
          ...item.dataValues,
        })),
      };
      responseJSON({
        res,
        status: 200,
        data: getPagingData(newData, limit, offset),
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async payDaily(req, res) {
    try {
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
}

module.exports = new controllerPay();
