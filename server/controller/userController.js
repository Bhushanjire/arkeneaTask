const express = require('express');
const UserSchema = require('../database/schema/userSchema');
const uploadFile = require('../common/functions');

class UserController {
    constructor() {

    }

    addUser(request, responce) {
        let userData = request.body;
        if (userData.photo) {
            const fileName = `${userData.firstName}-${Date.now()}.jpeg`;
            uploadFile(userData, fileName)
            userData.photo = fileName;
        }
        UserSchema.create(userData, (error, result) => {
            if (result) {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: true,
                    message: 'User created',
                    data: result
                })
            } else {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: false,
                    message: 'Email ID already exists',
                    data: error
                })
            }
        })
    }
    allUser(request, responce) {
        UserSchema.find({}, (error, result) => {
            if (result) {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: true,
                    message: 'All user list',
                    data: result
                })
            } else {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: false,
                    message: 'Error in user list',
                    data: error
                })
            }
        })
    }

    updateUser(request, responce) {
        const { userId, userData } = request.body;
        console.log('userData',userData);
        if (userData.photo) {
            const fileName = `${userData.firstName}-${Date.now()}.jpeg`;
            uploadFile(userData, fileName)
            userData.photo = fileName;
        }

        UserSchema.update({ _id: userId }, { $set: userData }, { new: true }, (error, result) => {
            if (result) {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: true,
                    message: 'User updated',
                    data: result
                })
            } else {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: false,
                    message: 'Error in user update',
                    data: error
                })
            }
        })
    }

    userById(request, responce) {
        const { userId } = request.body;
        UserSchema.findOne({ _id: userId }, (error, result) => {
            if (result) {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: true,
                    message: 'User data',
                    data: result
                })
            } else {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: false,
                    message: 'Error in user data',
                    data: error
                })
            }
        })
    }

    deleteUser(request, responce) {
        const { userId } = request.body;
        UserSchema.deleteOne({ _id: userId }, (error, result) => {
            if (result) {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: true,
                    message: 'User deleted',
                    data: result
                })
            } else {
                responce.status(200).send({
                    statusCode: 200,
                    isSuccess: false,
                    message: 'Error in user deleted',
                    data: error
                })
            }
        })


    }


}

module.exports = UserController;
