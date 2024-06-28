const bcryptjs = require('bcryptjs');
const PrismaClient = require('../../prisma/client');

const getUserByEmail = async (correo)  =>  {

    const usuario = await PrismaClient.usuarios.findMany({
        where: {
            correo: correo,
        }
    });

    return usuario;

};

const loginUser = async (correo, contraseña)  =>  {

    // const salt = await bcryptjs.genSalt(5); /** Configurando/generando salt 5 veces, para + a password*/
    // const hashPassword = await bcryptjs.hash(contraseña, salt);



    const usuario = await PrismaClient.usuarios.findFirst({
        where: {
            correo: correo
        }
    });
    
    const pwValid = await bcryptjs.compare(contraseña, usuario.contrasena)
    if (!pwValid) {
        return null;
    }

    return usuario;
};

const registerUser = async (correo, contraseña) => {

    // Validar si el correo ya existe
    const usuarioExistente = await PrismaClient.usuarios.findMany({
        where: { correo: correo }
    });

    if (usuarioExistente.length > 0) {
        throw new Error('Este usuario ya existe');
    }

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(contraseña, salt);

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await PrismaClient.usuarios.create({
        data: {
            correo: correo,
            contrasena: hashPassword
        }
    });

    return nuevoUsuario;
};

    
  
module.exports = {
    getUserByEmail,
    loginUser,
    registerUser,
};
