const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
const authRepository = require('../repositories/authRepository');
dotenv.config();

const login = (req, res) => {
    res.render('auth/login');
};

const register = (req, res) => {
    res.render('auth/register');
};

const sendLogin = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    const user = await authRepository.getUserByEmail(email);

    if (!user) {
        return res.status(400).send({ status: "Error", message: "Error durante el login" });
    }

    const loginCorrecto = await bcryptjs.compare(password, user.password);
    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Error durante el login" });
    }

    const token = jsonwebtoken.sign(
        { user: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    };

    res.cookie("jwt", token, cookieOption);
    res.status(200).send({ status: "ok", message: "Usuario logeado", redirect: "/admin" });
};

const sendRegister = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    const userExistente = await authRepository.getUserByEmail(email);
    if (userExistente) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
    }

    const nuevoUsuario = await authRepository.createUser({ email, password });

    res.status(201).send({ status: "ok", message: "Usuario agregado", redirect: "/" });
};

module.exports = {
    login,
    register,
    sendLogin,
    sendRegister
};
