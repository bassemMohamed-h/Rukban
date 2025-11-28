export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if(error) console.log(error.details);
  
  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: error.details.map(d => {return {message: d.message, value:d.context.value}}),
    });
  }
  next();
};
