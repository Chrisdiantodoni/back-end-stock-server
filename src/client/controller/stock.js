const { responseJSON } = require("../../../utils/general");
const stockModel = require("../../models/stock");
const { Op, where } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { getPagination, getPagingData } = paging;
const supplierModel = require("../../models/supplier");

class controllerStock {
  async createStock(req, res) {
    const { nama_barang, qty, supplierId, harga } = req.body;

    try {
      await stockModel.create({
        nama_barang,
        qty,
        supplierId,
        harga,
      });
      responseJSON({
        res,
        status: 200,
        data: "stock created",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async checkStock(req, res) {
    const {
      page = 1,
      size = 5,
      column_name = "nama_barang",
      query = "",
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
            nama_barang: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$supplier.nama_supplier$": {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
      const getStock = await stockModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
        include: [
          {
            model: supplierModel,
            as: "supplier",
          },
        ],
      });
      const newData = {
        count: getStock.count,
        rows: getStock.rows.map((item) => ({
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

module.exports = new controllerStock();
