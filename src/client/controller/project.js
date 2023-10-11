const projectModel = require("../../models/project");
const { Op } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const { getPagination, getPagingData } = paging;
const jobModel = require("../../models/job");
const stockModel = require("../../models/stock");
const tukangModel = require("../../models/tukang");
const supplierModel = require("../../models/supplier");
const projectStockModel = require("../../models/project_stock");
const gambarModel = require("../../models/gambar");
const { fullURL, pathImage, pathProgress } = require("../../../utils/url");
const pay = require("./pay");
const approvalProjectModel = require("../../models/approval_project");
const payProject = require("../../models/pay_project");
const progress_image = require("../../models/progress_image");
const upah_tukang = require("../../models/upah_tukang");

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
        approvalType,
        list_tukang = [],
      } = req.body;
      if (!req.files || req.files.length === 0) {
        responseJSON({
          res,
          data: "File not uploaded",
          status: 422,
        });
        return;
      }
      if (!nama_project) {
        responseJSON({
          res,
          data: "nama diperlukan",
          status: 422,
        });
        return;
      }
      if (!lokasi) {
        responseJSON({
          res,
          data: "Lokasi Diperlukan",
          status: 422,
        });
      }
      if (list_tukang.length === 0) {
        responseJSON({
          res,
          data: "tukang tidak dipilih",
          status: 422,
        });
      }
      const list_gambar = req.files;

      const parsedListStock = JSON.parse(list_stock);
      const parsedListJob = JSON.parse(list_job);
      const parsedListTukang = JSON.parse(list_tukang);

      const createdStockPromises = parsedListStock.map(async (stock) => {
        const existingStockRecord = await stockModel.findOne({
          where: {
            id: stock.id,
          },
        });
        console.log(existingStockRecord);
        let existingStockId = null;
        let createdStockRecordId = null;
        if (existingStockRecord) {
          const createdStockRecord = await projectStockModel.create({
            nama_barang: stock.nama_barang,
            qty: stock.qty,
            supplierId: stock?.supplierId
              ? stock.supplierId
              : stock.supplier.id,
            harga: stock.harga,
            stockId: existingStockId,
          });
          existingStockId = createdStockRecord.id;
        } else {
          const createdStockRecord = await projectStockModel.create({
            nama_barang: stock.nama_barang,
            qty: stock.qty,
            supplierId: stock?.supplierId
              ? stock.supplierId
              : stock.supplier.id,
            harga: stock.harga,
            stockId: existingStockId,
          });
          createdStockRecordId = createdStockRecord.id;
        }

        console.log(createdStockRecordId, existingStockId);
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
        approvalType,
        beli,
      });
      parsedListTukang.map(async (tukang) => {
        const createUpah = await upah_tukang.create({
          upah: tukang.upah,
          projectId: createProject.id,
          tukangId: tukang.id,
        });
        return createUpah.id;
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
        include: [
          {
            model: approvalProjectModel,
            as: "approval_projects",
          },
        ],
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
        include: {
          model: upah_tukang,
          as: "upah_tukangs",
          where: {
            projectId: id,
          },
        },
      });
      const getGambar = await gambarModel.findAll({
        raw: true,
      });
      const getImageProgress = await progress_image.findAll({
        raw: true,
      });

      const stockIds = getProject.dataValues?.stockId.split(",");
      const imageIds = getProject.dataValues?.imageId?.split(",") || "";
      const jobIds = getProject.dataValues?.jobId.split(",");
      const tukangIds = getProject.dataValues?.tukangId.split(",");
      const gambarIds = getProject.dataValues?.gambarId.split(",");

      const matchingStock = getStock.filter((stock) =>
        stockIds.includes(String(stock.id))
      );
      const matchingImage = getImageProgress.filter((image) =>
        imageIds.includes(String(image.id))
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

      getProject = {
        ...getProject.dataValues,
        list_stock: matchingStock,
        list_jobs: matchingJob,
        list_tukangs: matchingTukang,
        list_gambar: matchingGambar.map((item) => ({
          ...item,
          file_name: `${fullURL(req)}${pathImage}/${item.file_name}`,
        })),
        list_progress:
          matchingImage.map((item) => ({
            ...item,
            file_name: `${fullURL(req)}${pathProgress}/${item.file_name}`,
          })) || [],
      };

      responseJSON({
        res,
        status: 200,
        data: getProject,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 500,
        data: error.message,
      });
    }
  }

  async updateProject(req, res) {
    const {
      nama_project,
      userId,
      lokasi,
      tukangId,
      harga,
      start,
      end,
      list_stock = [],
      list_job = [],
      type,
      beli,
      info_gambar = [],
      list_tukang = [],
    } = req.body;
    const { projectId } = req.params;

    try {
      const list_gambar = req.files;
      const parsedListStock = JSON.parse(list_stock);
      const parsedListJob = JSON.parse(list_job);
      const parsedListGambar = JSON.parse(info_gambar);
      const parsedListTUkang = JSON.parse(list_tukang);

      parsedListTUkang.map(async (tukang) => {
        await upah_tukang
          .findOne({
            where: {
              tukangId: tukang.id,
              projectId,
            },
          })
          .then((res) => {
            res.update({
              upah: tukang.upah_tukangs[0]?.upah,
            });
          });
      });

      console.log(parsedListGambar);
      await projectModel.update(
        {
          stockId: "",
          jobId: "",
          status: "request",
        },
        {
          where: {
            id: projectId,
          },
        }
      );
      const createdStockPromises = parsedListStock.map(async (stock) => {
        let existingStockRecord = null;
        let existingStockId = null;
        let createdStockRecordId = null;
        existingStockRecord = await projectStockModel.findByPk(stock.id);
        if (existingStockRecord) {
          const updatedStock = await existingStockRecord.update({
            nama_barang: stock.nama_barang,
            qty: stock.qty,
            supplierId: stock.supplierId || stock.supplier?.supplierId,
            harga: stock.harga,
          });
          createdStockRecordId = updatedStock?.id;
        } else {
          const newStock = await projectStockModel.create({
            nama_barang: stock.nama_barang,
            qty: stock.qty,
            supplierId: stock.supplierId || stock.supplier?.supplierId,
            harga: stock.harga,
          });
          createdStockRecordId = newStock?.id;
        }

        const combinedIds = [existingStockId, createdStockRecordId]
          .filter(Boolean)
          .join(",");
        return combinedIds;
      });
      const existingImageIds = parsedListGambar.map((gambar) => gambar.id);
      const newImageIds = [];
      for (const file of list_gambar) {
        const uploadedImage = await gambarModel.create({
          file_name: file?.filename,
        });
        const getUploadedImage = await gambarModel.findOne({
          where: {
            id: uploadedImage.id,
          },
        });
        newImageIds.push(getUploadedImage?.id);
      }

      const updatedImageIds = [...existingImageIds, ...newImageIds];

      await projectModel.update(
        {
          nama_project,
          userId,
          lokasi,
          tukangId,
          start,
          end,
          harga,
          type,
          beli,
        },
        {
          where: {
            id: projectId,
          },
        }
      );

      const createdJobsPromises = parsedListJob.map(async (job) => {
        let existingJobsId = null;
        let createdJobsId = null;

        if (job.id) {
          const existingJobsRecord = await jobModel.findByPk(job.id);
          if (existingJobsRecord) {
            const updatedJob = await existingJobsRecord.update({
              name: job.name,
              qty: job.qty,
              harga: job.harga,
              tukangId: tukangId,
              projectId,
            });
            existingJobsId = updatedJob?.id;
          }
        }

        if (!existingJobsId) {
          const newJob = await jobModel.create({
            name: job.name,
            qty: job.qty,
            harga: job.harga,
            tukangId: tukangId,
            projectId,
          });
          createdJobsId = newJob?.id;
        }

        const combinedIds = [existingJobsId, createdJobsId]
          .filter(Boolean)
          .join(",");
        return combinedIds;
      });
      const createdTukangId = parsedListTUkang.map(async (tukang) => {
        const findTukang = await tukangModel.findByPk(tukang.id);
        return findTukang?.id;
      });

      const createdStock = (await Promise.all(createdStockPromises)).join(",");
      const createdJobs = (await Promise.all(createdJobsPromises)).join(",");
      const createdTukangs = (await Promise.all(createdTukangId)).join(",");

      await projectModel.update(
        {
          stockId: createdStock,
          jobId: createdJobs,
          gambarId: updatedImageIds.join(","),
          tukangId: createdTukangs,
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
