const asyncHandle = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("Detailed Error:", error);
      console.log("Error Detail:", {
        message: error.message,
        stack: error.stack,
      });
      return res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : "",
      });
    }
  };
};

export default asyncHandle;
