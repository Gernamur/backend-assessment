const indexController = (req, res, next) => {
    res.status(200).send("Server up!");
};

export { indexController };
