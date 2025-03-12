const validate = (requestName) => {
  return (req, res, next) => {
    const { error } = requestName.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        error: error.details[0].message,
      });
    }
    next();
  };
};
export default validate;
