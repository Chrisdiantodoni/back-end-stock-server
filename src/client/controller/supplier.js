const { responseJSON } = require("../../../utils/general");
const { Op } = require("sequelize");
const supplierModel = require("../../models/supplier");
const { general, paging, url, exportCSV } = require("../../../utils");
const { getPagination, getPagingData } = paging;

class controllerSupplier {
  async createSupplier(req, res) {
    const { nama_supplier, no_hp, alamat } = req.body;

    try {
      await supplierModel.create({
        nama_supplier,
        no_hp,
        alamat,
      });
      responseJSON({
        res,
        status: 200,
        data: "supplier created",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async checkSupplier(req, res) {
    const {
      page = 1,
      size = 5,
      column_name = "nama_supplier",
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
            nama_supplier: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            id: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
      const getSupplier = await supplierModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
      });
      const newData = {
        count: getSupplier.count,
        rows: getSupplier.rows.map((item) => ({
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
  async exportCSV(req, res) {
    try {
      const suppliers = await supplierModel.findAll();

      if (!suppliers || suppliers.length === 0) {
        return responseJSON({
          res,
          status: 200,
          data: "No data to export",
        });
      }

      const csvData = suppliers.map((supplier) => ({
        Id: supplier.id,
        Nama_Supplier: supplier.nama_supplier,
        No_Hp: supplier.no_hp,
        Alamat: supplier.alamat,
      }));
      const filename = "suppliers.csv";
      const type = "supplier";
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

module.exports = new controllerSupplier();
