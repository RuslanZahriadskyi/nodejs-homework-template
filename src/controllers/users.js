const { AuthService, UsersService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const userService = new UsersService();
const authService = new AuthService();

const reg = async (req, res, next) => {
  const { name, email, password, subcription } = req.body;
  const user = await userService.getUserByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: "This email already exist",
    });
  }
  try {
    const newUser = await userService.create({
      name,
      email,
      password,
      subcription,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subcription: newUser.subcription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Invalid creadentials",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;
  await authService.logout(userId);
  return res.status(HttpCode.NO_CONTENT).json({
    status: "success",
    code: HttpCode.NO_CONTENT,
  });
};

const currentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser(req.user.id);

    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { user },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "You are not authorized, please login on your account",
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscriptionStatus = async (req, res, next) => {
  try {
    const user = await userService.updateSubscriptionStatus(req.user.id);

    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { user },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "You are not authorized, please login on your account",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// const updateSubscriptionStatus = async (req, res, next) => {
//   try {
//     //   const userId = req.user.id;
//     console.log(req.user);
//     const user = await userService.updateSubscriptionStatus(req.body);
//     if (user) {
//       return res.status(HttpCode.OK).json({
//         status: "success",
//         code: HttpCode.OK,
//         data: { user },
//       });
//     }
//     next({
//       status: HttpCode.UNAUTHORIZED,
//       message: "You are not authorized",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  reg,
  login,
  logout,
  currentUser,
  updateSubscriptionStatus,
};