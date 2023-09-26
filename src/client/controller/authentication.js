const userModel = require("../../models/user");
const tokenModel = require("../../models/token");
const { Op, where } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { getPagination, getPagingData } = paging;
const { createToken, createRefreshToken } = require("../../../utils/token");

const { responseJSON, hash } = general;

class controllerAuthentication {
  async setupNewPassword(req, res) {
    const { username, pin, newPassword } = req.body;
    try {
      const getUser = await userModel.findOne({
        where: {
          username,
          pin: hash(pin),
        },
        attributes: {
          exclude: ["password", "pin"],
        },
      });
      getUser.update({
        password: hash(newPassword),
      });

      responseJSON({
        res,
        status: 200,
        data: getUser,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.errors?.map((item) => item.message),
      });
    }
  }
  async verifyAccountByPin(req, res) {
    const { username, pin } = req.body;
    try {
      const getUser = await userModel.findOne({
        where: {
          username,
          pin: hash(pin),
        },
        attributes: {
          exclude: ["password", "pin"],
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getUser,
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.errors?.map((item) => item.message),
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const getUser = await userModel.findOne({
        where: {
          email,
          password: hash(password),
        },
        attributes: {
          exclude: ["password", "pin"],
        },
        raw: true,
      });
      console.log(getUser.id);

      const token = createToken({ ...getUser });
      const refreshToken = createRefreshToken({ ...getUser });

      const getToken = await tokenModel.findOne({
        where: {
          userId: getUser.id,
        },
      });

      if (!getToken) {
        await tokenModel.create({
          userId: getUser.id,
          token,
          refreshToken,
        });
      } else {
        await getToken.update({
          token,
          refreshToken,
        });
      }

      responseJSON({
        res,
        status: 200,
        data: {
          data: getUser,
          type: "Bearer",
          token,
          refreshToken,
        },
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }

  async register(req, res) {
    const { email, password, pin, roles, nama_lengkap } = req.body;

    try {
      const result = await userModel.create({
        nama_lengkap,
        email,
        password: hash(password),
        pin: hash(pin),
        roles,
      });

      const getUser = await userModel.findOne({
        where: {
          id: result.id,
        },
        attributes: {
          exclude: ["password", "pin"],
        },
      });

      const token = createToken({ ...result });
      const refreshToken = createRefreshToken({ ...result });

      const getToken = await tokenModel.findOne({
        where: {
          userId: result.id,
        },
      });

      if (!getToken) {
        await tokenModel.create({
          userId: result.id,
          token,
          refreshToken,
        });
      } else {
        await getToken.update({
          token,
          refreshToken,
        });
      }

      responseJSON({
        res,
        status: 200,
        data: {
          data: getUser,
          type: "Bearer",
          token,
          refreshToken,
        },
      });
    } catch (error) {
      responseJSON({
        res,
        status: 400,
        data: error.message,
      });
    }
  }
  async getlistUser(req, res) {
    const {
      page = 1,
      size = 10,
      column_name = "nama_lengkap",
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
            nama_lengkap: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            roles: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
      const data = await userModel.findAndCountAll({
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
}

module.exports = new controllerAuthentication();
