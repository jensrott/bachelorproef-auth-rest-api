const express = require("express");
const router = express.Router();

const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

require("dotenv").config();

const saltRounds = 10;

// route: http://localhost:3000/auth
// @route: GET https://localhost:3000/auth
// @desc: Start route
// @access Public
router.get("/", (req, res) => {
  res.json({
    authentication: "start route"
  });
});

// @route: POST http://localhost:3000/auth/register
// @desc: Create a new user (register)
// @access: Public
router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (_, hash) => {
    const schema = Joi.object().keys({
      username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]+$)/)
        .min(2)
        .max(30)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.max":
                err.message = `Gebruikersnaam mag niet langer zijn dan ${
                  err.context.limit
                } tekens!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),

      password: Joi.string()
        .min(6)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.min":
                err.message = `Paswoord moet minstens ${
                  err.context.limit
                } tekens lang zijn!`;
                break;
              default:
                break;
            }
          });
          return errors;
        })
    });
    Joi.validate(req.body, schema, { abortEarly: false }, err => {
      if (err) {
        res.status(400).json({
          success: false,
          message: err.details.map(msg =>
            msg.message.replace(/\\"/g, "").replace(/"/g, "")
          )
        });
        return; // Stop the validation, if error
      } else {
        const newUser = new User({
          username: req.body.username,
          password: hash // Hashed pw
        });
        newUser
          .save()
          .then(user => {
            jwt.sign(
              { id: user._id },

              process.env.JWT_SECRET || secret,
              { expiresIn: 60 * 60 * 24 * 7 },
              (error, token) => {
                if (error)
                  res
                    .status(500)
                    .json({ error: "Error signing token", raw: error });
                res.json({
                  success: true,
                  register: true,
                  token: `${token}`,
                  user
                });
              }
            );
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              message: "Gebruiker bestaat al!"
            })
          );
      }
    });
  });
});

// @route: POST http://localhost:3000/auth/login
// @desc: Login user (login)
// @access: Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      const userPwd = user.password;
      bcrypt.compare(password, userPwd, (err, isValid) => {
        if (isValid) {
          const payload = {
            id: user._id
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET || secret,
            { expiresIn: 60 * 60 * 24 * 7 },
            (error, token) => {
              if (error)
                res
                  .status(500)
                  .json({ error: "Error signing token", raw: error });
              res.json({
                success: true,
                login: true,
                token: `${token}`,
                user
              });
            }
          );
          return;
        }
        res.status(400).json({
          success: false,
          message: "Gebruikersnaam of passwoord zijn incorrect!"
        });
      });
    })
    .catch(() =>
      res.status(404).json({
        success: false,
        message: "Gebruiker niet gevonden!"
      })
    );
});

module.exports = router;
