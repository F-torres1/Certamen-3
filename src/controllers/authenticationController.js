const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
const authRepository = require('../repositories/authRepository');
dotenv.config();


const login = (req, res) =>  {
    
    // console.log(logueado);
    if ( req.session.isAuthenticated){
        return res.redirect('/motos');
    } else {
        return res.render('auth/login');
    }
};

const register = (req, res) => {
    if (req.session.isAuthenticated){
        res.redirect('/motos');
    }else {
        res.render('auth/register');
    }
   
};

const sendLogin = async (req, res) => {
    console.log(req.body);
    const email = req.validatedData.email;
    const password = req.validatedData.password;

    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    const user = await authRepository.getUserByEmail(email);

    if (!user) {
        return res.status(400).send({ status: "Error", message: "Error durante el login" });
    }

    const loginCorrecto = await authRepository.loginUser(email, password);
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
    req.session.token = token;
    req.session.isAuthenticated = true;

    res.redirect("/motos");
    // res.status(200).send({ status: "ok", message: "Usuario logeado", redirect: "/admin" });
};

const sendRegister = async (req, res) => {
    if (!req.session.isAuthenticated)   
        return res.render('auth/login');
    console.log(req.body);
    const email = req.validatedData.email;
    const password = req.validatedData.password;

    const userExistente = await authRepository.getUserByEmail(email);
    if (userExistente.length > 0) {
        return res.redirect("/auth/login", {errors: ["usuario ya existe"]})
        // return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
    }

    const nuevoUsuario = await authRepository.registerUser(email, password);

    const token = jsonwebtoken.sign(
        { user: nuevoUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    };

    req.session.token = token;
    req.session.isAuthenticated = true;
    
    return res.redirect("/motos");
};

module.exports = {
    login,
    register,
    sendLogin,
    sendRegister
};
