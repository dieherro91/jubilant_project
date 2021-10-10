// En el controlador es donde podemos realizar las operaciones que necesitemos a la base de datos.
import { User } from "@auth0/auth0-spa-js";  // esto falta saber como se debe poner
import User from "../models/User";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("users/signup");

export const singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "La contraseña no coincide" });
  }
  if (password.length < 4) {
    errors.push({ text: "Las contraseñas deben ser de al menos 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // Buscar el email
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El email esta ya en uso.");
      res.redirect("/users/signup");
    } else {
      // Guardando un nuevo usuario
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Ud esta ya registrado");
      res.redirect("/users/signin");
    }
  }
};

export const renderSigninForm = (req, res) => res.render("users/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Ud esta desconectado");
  res.redirect("/users/signin");
};
// modelo sencillo de la conexion

'use strict';
const express = require('express'),
  router = express.Router(),
  User = require('./models').User;

router.route('/')

    .get(function (req, res) {
        User.find()
        .then(function (users) {
            res.locals.users = users;
            return res.render('users/users.html');
        });
    });