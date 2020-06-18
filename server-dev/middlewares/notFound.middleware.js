const notFound = (req, res, next) => res.status(404).send({ status: 404, message: 'No se encontró el recurso'});

export default notFound;