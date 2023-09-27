const { responseJSON } = require("../../../utils/general");
const { Op } = require("sequelize");
const tukangModel = require("../../models/tukang");
const { general, paging, url, exportCSV } = require("../../../utils");
const { getPagination, getPagingData } = paging;

class controllerTukang {
  async addTukang(req, res) {
    const { nama_tukang, no_ktp, no_hp, alamat } = req.body;
    try {
      await tukangModel.create({
        nama_tukang,
        no_ktp,
        no_hp,
        alamat,
      });
      responseJSON({
        res,
        status: 200,
        data: "tukang ditambah",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async getTukang(req, res) {
    const {
      page = 1,
      size = 5,
      column_name = "nama_tukang",
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
            nama_tukang: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
      const data = await tukangModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
      });
      const newData = {
        count: data.count,
        rows: data.rows.map((item) => ({
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
  async export(req, res) {
    try {
      const tukang = await tukangModel.findAll();

      if (!tukang || tukang.length === 0) {
        return responseJSON({
          res,
          status: 200,
          data: "No data to export",
        });
      }

      const csvData = tukang.map((tukang) => ({
        Id: tukang.id,
        nama_tukang: tukang.nama_tukang,
        No_Hp: tukang.no_hp,
        Alamat: tukang.alamat,
      }));
      const filename = "tukang.csv";
      const type = "tukang";
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

module.exports = new controllerTukang();
