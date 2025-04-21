const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const app = express();

// Session-Management
app.use(session({
    secret: 'geheimes_passwort', // Ändere dies für Sicherheit
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2-Konfiguration
passport.use(new DiscordStrategy({
    clientID: 'DEINE_CLIENT_ID',
    clientSecret: 'DEIN_CLIENT_SECRET',
    callbackURL: 'https://deine-domain.de/callback',
    scope: ['identify', 'email'], // Weitere Scopes, falls benötigt
}, (accessToken, refreshToken, profile, done) => {
    // Hier kannst du den Benutzer speichern oder verarbeiten
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Login-Route
app.get('/login', passport.authenticate('discord'));

// Callback-Route
app.get('/callback', passport.authenticate('discord', {
    failureRedirect: '/',
}), (req, res) => {
    // Erfolgreich eingeloggt
    res.redirect('/dashboard');
});

// Dashboard-Route
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.send(`Willkommen, ${req.user.username}`);
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));