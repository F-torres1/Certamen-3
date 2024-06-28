

const validateInput = (schema) => async (req, res, next) => {
    try {
        req.validatedData = await schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
        })
        next(); 
    } catch (err) {
        throw Error("error: " + err);
    }
}


module.exports = { validateInput };