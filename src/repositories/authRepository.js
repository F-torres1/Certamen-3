const bcryptjs = require('bcryptjs');
const prismaClient = require('@prisma/client');


const loginUser = async (correo, contraseña)  =>  {

    const salt = await bcryptjs.genSalt(5); /** Configurando/generando salt 5 veces, para + a password*/
    const hashPassword = await bcryptjs.hash(contraseña, salt);

    const usuario = prismaClient.usuario.findUnique({
        where: {
            correo: correo,
            contrasena: hashPassword
        }
    });

    return usuario;
};

const registerUser = async (correo, contraseña) => {

    // Validar si el correo ya existe
    const usuarioExistente = await prismaClient.usuario.findUnique({
        where: { correo: correo }
    });

    if (usuarioExistente) {
        throw new Error('Este usuario ya existe');
    }

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(contraseña, salt);

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await prismaClient.usuario.create({
        data: {
            correo: correo,
            contrasena: hashPassword
        }
    });

    return nuevoUsuario;
};

    
  
module.exports = {
    loginUser,
    registerUser,
};
