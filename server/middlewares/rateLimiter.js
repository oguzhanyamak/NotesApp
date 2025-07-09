const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için 15 dakikada 100 istek
  message: {
    status: 429,
    message: "Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin."
  }
});

module.exports = apiLimiter;