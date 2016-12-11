require('dotenv').config({silent:true});
const joi = require('joi');
const mg = require('nodemailer-mailgun-transport');
const nodemailer = require('nodemailer');


const checkEnv = () => {
  let errors = [];

  if (!process.env.MAILGUN_API_KEY) {
    errors.push('Error: You need to set the MAILGUN_API_KEY env var!');
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
};

const sendMail = (options, callback) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: options.domain
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: options.from,
    to: options.to, // An array if you have multiple recipients.
    subject: options.subject,
    html: options.html,
    text: options.text,
  }, callback);
};

const validateOptions = (options) => {
  const optionSchema = joi.object().keys({
    domain: joi.string().required(),
    from: joi.string().required(),
    to: joi.string().required(),
    subject: joi.string().required(),
    html: joi.string().required(), 
    text: joi.string().required(), 
  });

  joi.validate(options, optionSchema, (err, value) => {
    if (!err) {
      return;
    }

    err.details.forEach((error) => {
      console.log(error.message);
    });

    process.exit(1);
  });
};

const mailer = (options, callback) => {
  validateOptions(options);
  checkEnv();
  sendMail(options, callback);
};

module.exports = mailer;
