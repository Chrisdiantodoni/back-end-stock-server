const projectModel = require("../../models/project");
const { Op } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { responseJSON } = general;
const stockModel = require("../../models/stock");
const projectStockModel = require("../../models/project_stock");
const approvalProjectModel = require("../../models/approval_project");

class controllerApproval {
  async approveProject(req, res) {
    const { id } = req.params;

    try {
      const { status = "approved", typeApproval, comment, userId } = req.body;
      console.log(typeApproval);
      const findProject = await projectModel.findOne({
        where: {
          id: id,
        },
      });
      if (findProject) {
        findProject.update({
          status,
          approvalType: typeApproval,
        });
      }
      await approvalProjectModel.create({
        projectId: id,
        comment,
        userId,
        status,
      });

      const getProject = await projectModel.findOne({
        where: {
          id: id,
        },
      });
      const getStock = await projectStockModel.findAll({
        raw: true,
      });
      const stockIds = getProject.dataValues?.stockId.split(",");

      const matchingStock = getStock.filter((stock) =>
        stockIds.includes(String(stock.id))
      );

      const updatedStockIds = [];

      for (const stock of matchingStock) {
        const matchingStockRecord = await stockModel.findOne({
          where: {
            id: stock.stockId,
          },
        });
        console.log(stock);

        if (matchingStockRecord) {
          const newQuantity = parseInt(stock.qty) - matchingStockRecord.qty;
          await stockModel.update(
            {
              qty: newQuantity,
            },
            {
              where: {
                id: stock.stockId,
              },
            }
          );
        } else {
          const newStock = await stockModel.create({
            nama_barang: stock.nama_barang,
            qty: stock.qty,
            supplierId:
              stock.supplier?.supplierId || stock.supplier?.supplierId,
            harga: stock.harga,
          });
          updatedStockIds.push(newStock.id);
        }
      }

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
  async rejectProject(req, res) {
    const { id } = req.params;
    const { approvalType, comment, userId } = req.body;
    try {
      await projectModel.update(
        {
          status: "reject",
          approvalType,
        },
        {
          where: {
            id,
          },
        }
      );
      await approvalProjectModel.create({
        projectId: id,
        comment,
        userId,
        status,
      });
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
}

module.exports = new controllerApproval();
