const { general, paging } = require("../../../utils");
const { responseJSON } = general;
const { getPagination, getPagingData } = paging;
const { Op, Sequelize } = require("sequelize");
const tmp_stock_checking2 = require("../../models/tmp_stock_checking2");
const tmp_stock_checking = require("../../models/tmp_stock_checking");

const mst_locModel = require("../../models/mst_loc");
const mst_typeModel = require("../../models/mst_type");
const mst_partModel = require("../../models/mst_part");

class controllerStock {
  async checkStock(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "part_code",
      query = "",
    } = req.query;

    function getPagination(page, size) {
      const limit = size ? +size : 10; // Convert size to a number or use default value 10
      const offset = page ? (page - 1) * limit : 0; // Calculate offset based on page and limit
      return { limit, offset };
    }
    const { limit, offset } = getPagination(+page, +size);

    const condition = {
      [Op.or]: [
        {
          [column_name]: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          part_code: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          part_name: {
            [Op.like]: `%${query}%`,
          },
        },
      ],
    };

    try {
      const getStock = await mst_partModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        // order: [["part_code", "DESC"]],
        include: {
          model: mst_typeModel,
          as: "types",
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getStock, page, limit),
      });
    } catch (error) {
      responseJSON({
        res,
        status: 500,
        data: error.message,
      });
    }
  }

  async stockDepartment(req, res) {
    const { part_code } = req.params;
    const {
      page = 1,
      size = 10,
      column_name = "part_code",
      query = "",
    } = req.query;
    const { limit, offset } = getPagination(page, size);

    try {
      let result = null;
      const getStockDepartment = await tmp_stock_checking2.findAndCountAll({
        where: {
          [Op.or]: [
            {
              [column_name]: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              part_code: {
                [Op.eq]: query,
              },
            },
          ],
          part_code,
        },
        limit,
        offset,
        order: [["loc", "DESC"]],
        include: [
          {
            model: mst_locModel,
            as: "locs", // Use the correct alias ("mst_loc") based on your model definition
          },
          {
            model: mst_partModel,
            as: "parts", // Use the correct alias ("mst_part") based on your model definition
            include: [
              {
                model: mst_typeModel,
                as: "types", // Use the correct alias ("mst_type") based on your model definition
              },
            ],
            attributes: [
              "part_code",
              "unit_trans",
              [
                Sequelize.literal(`CASE
                      WHEN parts.unit_trans = parts.large_unit1 THEN parts.unit_per_pack1
                      WHEN parts.unit_trans = parts.large_unit2 THEN parts.unit_per_pack2
                      ELSE 1
                    END`),
                "unit_per_pack_global",
              ],
            ],
          },
        ],
      });

      if (getStockDepartment.rows === 0) {
        result = await tmp_stock_checking.findAndCountAll({
          where: {
            [Op.or]: [
              {
                [column_name]: {
                  [Op.like]: `%${query}%`,
                },
              },
              {
                part_code: {
                  [Op.eq]: query,
                },
              },
            ],
            part_code,
          },
          limit,
          offset,
          order: [["loc", "DESC"]],
          include: [
            {
              model: mst_locModel,
              as: "locsA", // Use the correct alias ("mst_loc") based on your model definition
            },
            {
              model: mst_partModel,
              as: "partsA", // Use the correct alias ("mst_part") based on your model definition
              include: [
                {
                  model: mst_typeModel,
                  as: "typesA", // Use the correct alias ("mst_type") based on your model definition
                },
              ],
              attributes: [
                "part_code",
                "unit_trans",
                [
                  Sequelize.literal(`CASE
                        WHEN parts.unit_trans = parts.large_unit1 THEN parts.unit_per_pack1
                        WHEN parts.unit_trans = parts.large_unit2 THEN parts.unit_per_pack2
                        ELSE 1
                      END`),
                  "unit_per_pack_global",
                ],
              ],
            },
          ],
        });
      } else {
        result = getStockDepartment;
      }

      responseJSON({
        res,
        status: 200,
        data: getPagingData(result, page, limit),
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

module.exports = new controllerStock();
