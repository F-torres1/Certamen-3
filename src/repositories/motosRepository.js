let motos = require('../models/motosModel');
const PrismaClient = require('../../prisma/client');

const getAllMotos = async () => {
  // LOGICA BD PRISMA
  const motosTest = await PrismaClient.motos.findMany();

  return motosTest;
};

const getMotoById = async (id) => {
  const motoTest = await PrismaClient.motos.findUnique({
    where:{
      id: parseInt(id)
    }
  });
  return motoTest;
};

const createMoto = async (moto) => {

  const nuevaMoto = await PrismaClient.motos.create({
    data:{
      marca: moto.marca,
      modelo: moto.modelo,
      ano: parseInt(moto.año),
      motor: moto.motor,
      tipo: moto.tipo,
      precio: parseInt(moto.precio),
      caracteristicas : moto.caracteristicas
    }
  });

  // const nuevaMoto = {
  //   id: motos.length + 1,
  //   ...moto,
  //   características: Array.isArray(moto.características) ? moto.características : moto.características.split(',')
  // };
  // motos.push(nuevaMoto);
  return nuevaMoto;
};

const updateMoto = async (id, updatedMoto) => {

  const moto = await PrismaClient.motos.findUnique({
    where:{
      id: parseInt(id)
    }
  });

  if (!moto) {
    return null;
  }

  const nuevaMoto = await PrismaClient.motos.update({
    where:{
      id: parseInt(id)
    },
    data:{
      marca: updatedMoto.marca,
      modelo: updatedMoto.modelo,
      ano: parseInt(updatedMoto.año),
      motor: updatedMoto.motor,
      tipo: updatedMoto.tipo,
      precio: parseInt(updatedMoto.precio),
      caracteristicas : updatedMoto.caracteristicas
    }
  });
  
  if (!nuevaMoto) {
    return null;
  }

  return nuevaMoto;
};

const deleteMoto = async (id) => {

  const moto = await PrismaClient.motos.findUnique({
    where:{
      id: parseInt(id)
    }
  });

  if (!moto) {
    return null;
  }

  const motoEliminada = await PrismaClient.motos.delete({
    where:{
      id: parseInt(id)
    }
  });

  return motoEliminada;
};

module.exports = {
  getAllMotos,
  getMotoById,
  createMoto,
  updateMoto,
  deleteMoto
};
