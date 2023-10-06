const { responseJSON } = require("../../../utils/general");
const stockModel = require("../../models/stock");
const { Op, where } = require("sequelize");
const { general, paging, url, exportCSV } = require("../../../utils");
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
  async getAllStock(req, res) {
    try {
      const getStock = await stockModel.findAll();
      responseJSON({
        res,
        status: 200,
        data: getStock,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async exportStock(req, res) {
    try {
      const stock = await stockModel.findAll({
        include: [
          {
            model: supplierModel,
            as: "supplier",
          },
        ],
      });

      if (!stock || stock.length === 0) {
        return responseJSON({
          res,
          status: 200,
          data: "No data to export",
        });
      }

      const csvData = stock.map((stock) => ({
        Id: stock.id,
        nama_barang: stock.nama_barang,
        qty: stock.qty,
        nama_supplier: stock.supplier?.nama_supplier,
        harga: stock.harga,
      }));
      const filename = "stock.csv";
      const type = "stock";
      await exportCSV(csvData, res, type, filename);
    } catch (error) {
      responseJSON({
        res,
        status: 500,
        data: error.message,
      });
    }
  }
}

module.exports = new controllerStock();
