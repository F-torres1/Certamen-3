const motosRepository = require('../repositories/motosRepository');

const getAllMotos = async (req, res) => {

  const motos = await motosRepository.getAllMotos();
  return res.render('motos/index', { motos });
};

const getMotoById = async (req, res) => {
  if (!req.session.isAuthenticated)   
    return res.render('auth/login');

  const moto = await motosRepository.getMotoById(req.params.id);
  if (moto) {
    res.render('motos/show', { moto });
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const createMotoForm = async (req, res) => {
  if (!req.session.isAuthenticated)   
    return res.render('auth/login');
  res.render('motos/create');
};

const createMoto = async (req, res) => {
  if (!req.session.isAuthenticated)
    return res.render('auth/login');
  const nuevaMoto = await motosRepository.createMoto(req.body);
  res.redirect('/motos');
};

const updateMotoForm = async (req, res) => {
  if (!req.session.isAuthenticated)   
    return res.render('auth/login');
  const moto = await motosRepository.getMotoById(req.params.id);
  if (moto) {
    res.render('motos/edit', { moto });
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const updateMoto = async (req, res) => {
  if (!req.session.isAuthenticated)   
    return res.render('auth/login');
  const updatedMoto = await motosRepository.updateMoto(req.params.id, req.body);
  if (updatedMoto) {
    res.redirect('/motos');
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const deleteMoto = async (req, res) => {
  if (!req.session.isAuthenticated)   
    return res.render('auth/login');
  await motosRepository.deleteMoto(req.params.id);
  res.redirect('/motos');
};

module.exports = {
  getAllMotos,
  getMotoById,
  createMotoForm,
  createMoto,
  updateMotoForm,
  updateMoto,
  deleteMoto
};
