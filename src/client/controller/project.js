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

class controllerProject {
  async createProject(req, res) {
    try {
      const {
        nama_project,
        userId,
        lokasi,
        stockId,
        deadline,
        tukangId,
        jobId,
        harga,
        start,
        end,
        status,
        list_stock = [],
        list_job = [],
      } = req.body;

      let createdJob = JSON.parse(JSON.stringify(list_job));
      let createdStock = JSON.parse(JSON.stringify(list_stock));
      const stockIdArray = stockId.split(",");
      const jobIdArray = jobId.split(",");

      for (let i = 0; i < createdStock.length; i++) {
        const stock = createdStock[i];
        // const stockId = stockIdArray[i];
        // const quantity = stock.qtyStock;

        // const existingStock = await stockModel.findByPk(stockId);

        // if (existingStock) {
        //   if (existingStock.qty <= 0) {
        //     existingStock.qty += Math.abs(quantity);
        //   } else {
        //     existingStock.qty -= quantity;
        //   }
        //   await existingStock.save();
        // } else {
        //   await stockModel.create({
        //     nama_barang: stock.nama_barang,
        //     qty: stock.qtyStock,
        //     supplierId: stock.supplierId,
        //     harga: stock.hargaStock,
        //   });
        // }
        await projectStockModel.create({
          nama_barang: stock.nama_barang,
          qty: stock.qtyStock,
          supplierId: stock.supplierId,
          harga: stock.hargaStock,
        });
      }

      const createProject = await projectModel.create({
        nama_project,
        userId,
        lokasi,
        stockId: createdStock,
        deadline,
        tukangId,
        jobId: createdJob,
        start,
        end,
        status,
        harga,
      });

      const createdJobs = [];

      for (let i = 0; i < list_job.length; i++) {
        const job = list_job[i];
        const jobId = jobIdArray[i];

        const createdJob = await jobModel.create({
          name: job.name,
          qty: job.qtyJob,
          harga: job.hargaJob,
          projectId: createProject.id,
          tukangId: tukangId,
        });
        createdJobs.push(createdJob);
      }

      responseJSON({
        res,
        status: 200,
        data: "project created",
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
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

  async addTukang(req, res) {
    const { nama_tukang, no_ktp } = req.body;
    try {
      await tukangModel.create({
        nama_tukang,
        no_ktp,
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
          [Op.or]: [
            {
              [column_name]: {
                [Op.between]: [start, end],
              },
            },
            {
              createdAt: {
                [Op.between]: [start, end],
              },
            },
          ],
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
