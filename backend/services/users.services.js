const User = require("../models/users.models");

const createUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        const error = new Error("User already exists with this email");
        error.statusCode = 400;
        throw error;
    }

    return await User.create(userData);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email }); 
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const updateFullname = async (id, newName) => {
    return await User.findByIdAndUpdate(
        id, 
        { fullname: newName }, 
        { new: true, runValidators: true }
    );
};

const removeUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateFullname,
    removeUser
};