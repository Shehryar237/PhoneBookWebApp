
const errorHandler = (error, request, response, next) => {
  console.error(error.message); // Log error for debugging

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted ID' });
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  else if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: 'Duplicate entry detected' });
  }
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  response.status(500).json({ error: 'Something went wrong' });
  next(error);//pass unhandled errors to the default error handler
};

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  return authorization?.startsWith('Bearer ') 
    ? authorization.replace('Bearer ', '')
    : null;
};

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);
  if (!token) return res.status(401).json({ error: 'token missing' });
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userExtractor };
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

module.exports = { errorHandler, unknownEndpoint,userExtractor };