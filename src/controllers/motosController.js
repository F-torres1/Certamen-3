const motosRepository = require('../repositories/motosRepository');

const getAllMotos = (req, res) => {
  const motos = motosRepository.getAllMotos();
  res.render('motos/index', { motos });
};

const getMotoById = (req, res) => {
  const moto = motosRepository.getMotoById(req.params.id);
  if (moto) {
    res.render('motos/show', { moto });
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const createMotoForm = (req, res) => {
  res.render('motos/create');
};

const createMoto = (req, res) => {
  const nuevaMoto = motosRepository.createMoto(req.body);
  res.redirect('/api/motos');
};

const updateMotoForm = (req, res) => {
  const moto = motosRepository.getMotoById(req.params.id);
  if (moto) {
    res.render('motos/edit', { moto });
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const updateMoto = (req, res) => {
  const updatedMoto = motosRepository.updateMoto(req.params.id, req.body);
  if (updatedMoto) {
    res.redirect('/api/motos');
  } else {
    res.status(404).send('Moto no encontrada');
  }
};

const deleteMoto = (req, res) => {
  motosRepository.deleteMoto(req.params.id);
  res.redirect('/api/motos');
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
