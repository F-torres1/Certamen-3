let motos = require('../models/motosModel');
const prismaClient = require('../../prisma/client');

const getAllMotos = () => {
  // LOGICA BD PRISMA
  const motosTest = prismaClient.motos.findMany();

  return motosTest;
};

const getMotoById = (id) => {
  const motoTest = prismaClient.motos.findUnique({
    where:{
      id: id
    }
  });
  return motoTest;
};

const createMoto = (moto) => {

  const motoTest = prismaClient.motos.create({
    data:{
      marca: moto.marca,
      
    }
  });

  const nuevaMoto = {
    id: motos.length + 1,
    ...moto,
    características: Array.isArray(moto.características) ? moto.características : moto.características.split(',')
  };
  motos.push(nuevaMoto);
  return nuevaMoto;
};

const updateMoto = (id, updatedMoto) => {
  const moto = motos.find(m => m.id === parseInt(id));
  if (moto) {
    Object.assign(moto, updatedMoto, {
      características: Array.isArray(updatedMoto.características) ? updatedMoto.características : updatedMoto.características.split(',')
    });
    return moto;
  }
  return null;
};

const deleteMoto = (id) => {
  motos = motos.filter(m => m.id !== parseInt(id));
  return motos;
};

module.exports = {
  getAllMotos,
  getMotoById,
  createMoto,
  updateMoto,
  deleteMoto
};
