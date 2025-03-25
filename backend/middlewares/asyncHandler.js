// Exporting a function that will handle the async errors in the routes
const asyncHandler = (fn) => (req, res, next) => {

    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(error);
    });
  
};

export default asyncHandler;