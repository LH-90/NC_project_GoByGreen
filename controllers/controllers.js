const {
  selectUsers,
  selectUserById,
  selectUserRoutes,
  selectRouteById,
  makeUser,
  makeUserRoute, 
  changeUser,
  changeUserRoute,
  removeUser,
  removeUserRoute,
} = require("../models/models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
    const {user_id} = req.params
    try {
        const user = await selectUserById(user_id);
        res.status(200).send({ user });
      } catch (err) {
        next(err);
      }
};

exports.getUserRoutes = async (req, res, next) => {
    const {user_id} = req.params
    try {
        const routes = await selectUserRoutes(user_id);
        res.status(200).send({ routes });
      } catch (err) {
        next(err);
      }
};

exports.getRouteById = async (req, res, next) => {
    const {user_id, route_id} = req.params

    try {
        const route = await selectRouteById(user_id, route_id);
        res.status(200).send({
          route_id: route.route_id,
          user_id: route.user_id,
          route_address: route.route_address,
          carbon_usage: route.carbon_usage,
          route_distance: route.route_distance
         });
      } catch (err) {
        next(err);
      }
};

exports.createUser = async (req, res, next) => {
    const newUser = req.body
    try {
        const newUserDetails = await makeUser(newUser);
        res.status(201).send({ 
            user_id: newUserDetails.user_id,
            username: newUserDetails.username,
            name: newUserDetails.name,
            profile_url: newUserDetails.profile_url,
            total_routes: newUserDetails.total_routes,
            total_carbon: newUserDetails.total_carbon
          });
      } catch (err) {
        next(err);
      }
};

exports.createUserRoute = async (req, res, next) => {
  const {user_id} = req.params
    const newRouteInfo = req.body
    try {
        const newRoute = await makeUserRoute(user_id, newRouteInfo);
        res.status(201).send({ 
          user_id: newRoute.user_id,
          route_address: newRoute.route_address,
          carbon_usage: newRoute.carbon_usage,
          route_distance: newRoute.route_distance
          });
      } catch (err) {
        next(err);
      }
};

exports.patchUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { username, name, profile_url } = req.body;
  try {
    const updatedUser = await changeUser(user_id, name, username, profile_url);
    res.status(200).json({
        user_id: updatedUser.user_id,
        name: updatedUser.name,
        username: updatedUser.username,
        profile_url: updatedUser.profile_url,
        total_routes: updatedUser.total_routes,
        total_carbon: updatedUser.total_carbon,
    });
  } catch (err) {
    next(err);
  }
};

exports.patchUserRoute = async (req, res, next) => {
  const {user_id, route_id} = req.params;
  const { route_address, carbon_usage, route_distance } = req.body;

  try {
    const updatedUser = await changeUserRoute(user_id,route_id, route_address, carbon_usage, route_distance);
    res.status(200).json({
      route_id: updatedUser.route_id,
      user_id: updatedUser.user_id,
      route_address: updatedUser.route_address,
      carbon_usage: updatedUser.carbon_usage,
      route_distance: updatedUser.route_distance,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
    const {user_id} = req.params
    try {
        await removeUser(user_id)
        res.status(204).send()
    } catch (err) {
        next(err);
      }
};

exports.deleteUserRoute = async (req, res, next) => {
    const {user_id, route_id} = req.params
    try {
        await removeUserRoute(user_id, route_id)
        res.status(204).send()
    } catch (err) {
        next(err);
      }
};
