const userModel = require("../../models/user");
const tokenModel = require("../../models/token");
const { Op, where } = require("sequelize");
const { general, paging, url } = require("../../../utils");
const { getPagination, getPagingData } = paging;
const { createToken, createRefreshToken } = require("../../../utils/token");
const crypto = require("crypto");
const { responseJSON, hash } = general;

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
class controllerAuthentication {
  async setupNewPassword(req, res) {
    const { id } = req.params;
    const { newPassword } = req.body;
    try {
      const getUser = await userModel.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password", "pin"],
        },
      });
      await getUser.update({
        password: hash(newPassword),
        reset_password: false,
      });
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

  async resetPassword(req, res) {
    const { id } = req.params;

    try {
      const result = await userModel.findOne({
        where: {
          id,
        },
      });

      if (!result) {
        responseJSON({
          res,
          status: 404,
          data: "User not found.",
        });
        return;
      }
      let r = crypto.randomBytes(5).toString("hex");
      result.update({
        password: r,
        reset_password: true,
      });
      const getUser = await userModel.findOne({
        where: {
          id,
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
        data: error.message,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      let getUser = await userModel.findOne({
        where: {
          email,
        },
      });

      if (!getUser) {
        responseJSON({
          res,
          status: 404,
          data: "User not found.",
        });
        return;
      }
      console.log(getUser);

      if (getUser.dataValues?.reset_password) {
        const changePasswordUser = await userModel.findOne({
          where: {
            email,
          },
        });
        responseJSON({
          res,
          status: 201,
          data: changePasswordUser,
        });
        return;
      }

      const hashedPassword = hash(password);

      if (getUser.password === hashedPassword) {
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
      }
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
      const existingUser = await userModel.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return responseJSON({
          res,
          status: 422,
          data: "Email already exists.",
        });
      }

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

  async getUserDetail(req, res) {
    const { id } = req.params;

    try {
      const result = await userModel.findOne({
        where: {
          id,
        },
      });
      responseJSON({
        res,
        status: 200,
        data: result,
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
  async updateUser(req, res) {
    const { id } = req.params;
    const { nama_lengkap, roles, email } = req.body;
    try {
      const user = await userModel.findOne({
        where: { id },
      });

      if (!user) {
        return responseJSON({
          res,
          status: 404,
          data: "User not found",
        });
      }

      await user.update({
        nama_lengkap,
        roles,
        email,
      });
      responseJSON({
        res,
        status: 200,
        data: "User updated successfully",
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
