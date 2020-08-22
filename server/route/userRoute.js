const express = require('express');
const route = express.Router();
const UserController = require('../controller/userController')

const user = new UserController();

route.post('/add-user', user.addUser);
route.get('/user-list', user.allUser);
route.put('/update-user', user.updateUser);
route.post('/delete-user', user.deleteUser);
route.post('/user-by-id', user.userById);

module.exports = route;