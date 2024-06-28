const { setLocale, ref } = require("yup");
const  {es } = require("yup-locales");
const { object, string, number } = require("yup");

setLocale(es);

const userSchema = object ({
    email: string().required(),
    password: string().required()
})

module.exports = {userSchema};