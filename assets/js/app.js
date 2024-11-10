const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Configura la sesión
app.use(session({
  secret: 'secret-session-key',  // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport para usar la estrategia de Google OAuth
passport.use(new GoogleStrategy({
  clientID: '445329211371-em7el4phlkij9gkri801ou2hr9f0d7a8.apps.googleusercontent.com',  // Agrega tu Client ID aquí
  clientSecret: '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',  // Agrega tu Client Secret aquí
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback',  // Redirige aquí tras la autenticación
},
function(accessToken, refreshToken, profile, done) {
  // En este punto podrías crear o verificar el usuario en tu base de datos.
  // Aquí puedes acceder al perfil de Google del usuario.
  return done(null, profile);
}));

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Rutas para la autenticación
app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Redirige al dashboard después de la autenticación exitosa
    res.redirect('/dashboard');
  }
);

// Ruta protegida para mostrar después de iniciar sesión
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hola ${req.user.displayName}, has iniciado sesión con éxito.`);
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Página principal (por ejemplo, página del abogado)
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenido al sitio del abogado</h1>
    <a href="/auth/google">Iniciar sesión con Google</a>
  `);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

