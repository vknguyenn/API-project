// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validationQuery = (query) =>{
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = query;
  const err = {};

  page = parseInt(page);
  size = parseInt(size);

  if (page < 1) err.page = "Page must be greater than or equal to 1"
  if (size < 1) err.size = "Size must be greater than or equal to 1"

  if(minLat) {
    if (minLat < -90 || minLat > 90) err.minLat = "Minimum latitude is invalid"
  }

  if(maxLat) {
    if (maxLat < -90 || maxLat > 90) err.maxLat = "Maximum latitude is invalid"
  }

  if(minLng) {
    if (minLng < -180 || minLng > 180) err.minLng = "Minimum longitude is invalid"
  }

  if(maxLng) {
    if (maxLng < -180 || maxLng > 180) err.maxLng = "Maximum longitude is invalid"
  }

  if(minPrice) {
    if (minPrice < 0) err.minPrice = "Minimum price must be greater or equal to 0"
  }

  if(maxPrice) {
    if (maxPrice < 0) err.maxPrice = "Minimum price must be greater or equal to 0"
  }
  return err;
}

module.exports = {
  handleValidationErrors, validationQuery
};