const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const motosRoutes = require('./routes/motos');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'claveultrasecretaxd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia esto a true si usas HTTPS
}));

app.use((req, res, next) => {
  if (!req.session.data) {
    req.session.data = {}; // Inicializa el objeto de sesión si no existe
  }
  next();
});

// Middleware para pasar la sesión a todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get('/', (req, res) => {
  res.redirect("/auth/login");
});
app.use('/motos', motosRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



