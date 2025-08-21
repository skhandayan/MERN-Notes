import ratelimit from "../config/upstash.js"

const rateLimitter = async (req, res, next) => {

  try {
    const { success } = await ratelimit.limit(req.ip);

    if(!success) {
      return res.status(429).json({
        message:'Too many request, please try again later'
      });
    };

    next();
  } catch (error) {
    console.log('Ratelimit Error', error);
    next(error);
  }
}

export default rateLimitter;