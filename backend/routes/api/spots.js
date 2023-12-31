const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validationQuery } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();


const authenUser = async (req, res, next) => {
    const { user } = req;
    if (user) {
        next()
    } else {
        return res.status(401).json({
            'message': 'Authentication required'
        });
    }
}

const authorUser = async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);
    if(spot) {
        if(spot.ownerId == user.id) {
            next()
        } else {
            return res.status(403).json({"message": "Forbidden"})}
        } else {
            return res.status(404).json({"message": "Spot couldn't be found"})}
        }
    

    const validSpot = async (req, res, next) => {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);
        
        if(spot) {
            next()
        } else {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }
    }


router.get('/current', requireAuth, async(req, res, next)=> {
    const { id } = req.user;
    const spotArr = [];

    const spots = await Spot.findAll({
        where: {ownerId: id}
    });

    for(let i = 0; i < spots.length; i++) {
        let spot = spots[i];

    const numReviews = await Review.count({
        where: {spotId: id}
    })

    const sumReview = await Review.sum('stars', {
        where: {spotId: id}
    });


    const avgRating = sumReview / numReviews;

    const previewImage = await SpotImage.findOne({        
        where: {spotId: id, preview: true}
    })
    spot = spot.toJSON();
    if (avgRating) {
        spot.avgRating = avgRating;
    } else {
        spot.avgRating = "This spot has no reviews yet"
    }
    if(previewImage) {
        spot.previewImage = previewImage.url
    }else {
        spot.previewImage = "This spot has no preview image yet"
    }
    spotArr.push(spot)

    }
    res.json({Spots: spotArr})
})

router.get('/:spotId', async(req, res, next) => {
    const { spotId } = req.params;
    console.log("Requested spotId:", spotId);
    let spot = await Spot.findByPk(spotId);
    if (spot) {

            const numReviews = await Review.count({
                where:{spotId: spot.id}
            })
            
            const sumReview = await Review.sum('stars',{
                where: {spotId}
            })
        
            const avgRating = sumReview / numReviews;
        
            spot = spot.toJSON();
            spot.numReviews = numReviews;
            spot.avgRating = avgRating;
            spot.SpotImages = await SpotImage.findAll({
                where: {
                    spotId
                },
                attributes: ['id', 'url', 'preview']
            })
            console.log("SPOT IMAGE HERE: ", spot.SpotImages)
            spot.Owner = await User.findByPk(spot.ownerId, {
                attributes: ['id', 'firstName', 'lastName']
            })
            console.log("Spot found:", spot);
            return res.json(spot)
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    
    
})

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country is required'),
    // check('lat')
    //   .isFloat({min: -90, max: 90})
    //   .withMessage('Latitude is not valid'),
    // check('lng')
    //   .isFloat({min: -180, max: 180})
    //   .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({max: 49})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .isFloat({min: 1})
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

router.get('/', async (req, res, next) => {
let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const errors = validationQuery(req.query)

    if(Object.keys(errors).length) {
        res.status(400);
        const err = new Error();
        err.message = "Bad Request"
        err.errors = errors

        return res.json(err)
    }
    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || page <= 0 || !page) page = 1;
    if (Number.isNaN(size) || size <= 0 || !size) size = 20;
    
    if(page > 10) page = 10;
    if(size > 20) size = 20;

    const obj = {};

    if(minLat && !maxLat) obj.lat = {[Op.gte]: minLat}
    if(maxLat && !minLat) obj.lat = {[Op.lte]: maxLat}
    if(minLat && maxLat) obj.lat = {[Op.between]: [minLat, maxLat]}

    if(minLng && !maxLng) obj.lng = {[Op.gte]: minLng}
    if(maxLng && !minLng) obj.lng = {[Op.lte]: maxLng}
    if(minLng && maxLng) obj.lng = {[Op.between]: [minLng, maxLng]}

    if(minPrice && !maxPrice) obj.minPrice = minPrice
    if(maxPrice && !minPrice) obj.maxPrice = maxPrice
    if(minPrice && maxPrice) obj.price = {[Op.between]: [minPrice, maxPrice]}
    

    

    const spots = await Spot.findAll({
        obj,
        limit: size,
        offset: size * (page - 1)
    });

    const allSpots = [];

    for(let i = 0; i < spots.length; i++) {
        let spot = spots[i];

        const numReviews = await Review.count({
            where: {spotId: spot.id}
        })

        const sumReview = await Review.sum('stars', {
            where: {spotId: spot.id}
        });


        const avgRating = sumReview / numReviews;

        const previewImage = await SpotImage.findOne({
            where: {spotId: spot.id, preview: true}
        })
        spot = spot.toJSON();
        if (avgRating) {
            spot.avgRating = avgRating;
        } else {
            spot.avgRating = "This spot has no reviews yet"
        }
        if(previewImage) {
            spot.previewImage = previewImage.url
        }else {
            spot.previewImage = "This spot has no preview image yet"
        }
        allSpots.push(spot);
    }

    return res.json({Spots: allSpots, page, size})
}
)




router.post('/', authenUser, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    
    const spotPost = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.status(201).json(spotPost)
})

router.post('/:spotId/images', authenUser, authorUser, async(req, res, next) =>  {
    const newImage = {};
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const spotImage = await SpotImage.create({spotId, url, preview});
    
    newImage.id = spotImage.id;
    newImage.url = url;
    newImage.preview = preview;
    res.json(newImage);
})

router.put('/:spotId', authenUser, authorUser, validateSpot, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotEdit = await Spot.findByPk(req.params.spotId);

    if (address) spotEdit.address = address;
    if (city) spotEdit.city = city;
    if (state) spotEdit.state = state;
    if (country) spotEdit.country = country;
    if (lat) spotEdit.lat = lat;
    if (lng) spotEdit.lng = lng;
    if (name) spotEdit.name = name;
    if (description) spotEdit.description = description;
    if (price) spotEdit.price = price;

    await spotEdit.save();

    res.json(spotEdit)
})

router.delete('/:spotId', authenUser, authorUser, async(req, res, next) => {

    const destroySpot = await Spot.findByPk(req.params.spotId);

    await destroySpot.destroy();

    res.json({
        "message": "Successfully deleted"
      });
})


router.get('/:spotId/reviews', validSpot, async (req, res) => {
    const { spotId } = req.params;
    const reviews = await Spot.findByPk(spotId, {
        attributes: [],
        include: [{
            model: Review,
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }, 
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
    }]
    })
    res.json(reviews)
})

router.get('/:spotId/bookings', authenUser, async (req, res) => {
    const { user } = req;
    const { spotId } = req.params;
    
    const spot = await Spot.findByPk(spotId)

    if (spot) {
    
        if (spot.ownerId == user.id) {
            const bookings = await Booking.findAll({
                where: {spotId},
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });
            return res.json({Bookings: bookings})
        }
        if (spot.ownerId != user.id) {
            const bookings = await Booking.findAll({
                where: {spotId},
                attributes: ['spotId', 'startDate', 'endDate']
            });
            return res.json({Bookings: bookings})
        } 
    } else {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

})

const validateReview = [
    check('review')
    .exists({checkFalsy: true})
    .notEmpty()
    .withMessage('Review text is required'),
    check('stars')
    .exists({checkFalsy: true})
    .isInt({min:1, max:5, allow_leading_zeroes: false})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

router.post('/:spotId/reviews', authenUser, validSpot, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const { spotId }= req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId)
    const reviews = await spot.getReviews({
        attributes: [],
        include:{
            model: User,
            attributes: ['id']
        }
    })
    
    // const reviews = await Review.findAll({
        //     where: {spotId}
        // })
        
        for(let review of reviews) {
            if (review.User.id == userId) {
                return res.status(500).json({
                    "message": "User already has a review for this spot"
                })
            }
        }

        const reviewPost = await Review.create({
            spotId: parseInt(spotId),
            userId,
            review,
            stars
        })

        return res.status(201).json(reviewPost)
})


const notSpotOwner = async function (req, res, next) {
    const { spotId } = req.params
    const userId = req.user.id;
    if (!req.user) {
      return requireAuth(req, res, next);
    }

    const spots = await Spot.findOne({
      where: {
        id: spotId
      }
    });
  
    if (spots.ownerId != userId) {
      return next();
    }
  
    const err = new Error('Forbidden');
    err.title = 'Authorization required';
    err.errors = { message: 'Spot cannot be rented by owner' };
    err.status = 403;
    return next(err);
  }
  
const checkConflict = async(req, res, next) => {
    let { spotId, bookingId } = req.params;
    const { startDate, endDate } = req.body;
    startTime = new Date(startDate).getTime();
    endTime = new Date(endDate).getTime();
  
    if (!spotId) {
      const booking = await Booking.findByPk(bookingId);
      spotId = booking.spotId;
    }
  
    const spot = await Spot.findByPk(spotId, {
      include: {
        model: Booking,
        attributes: ["id", "startDate", "endDate"]
      }
    });
  
    let conflict = false;
  
    for (let booking of spot.Bookings) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const errors = {};
  
      if (parseInt(bookingId) !== booking.id) {
        if (startTime >= start && startTime <= end) {
          errors.startDate = "Start date conflicts with an existing booking";
          conflict = true;
        }
  
        if (endTime >= start && endTime <= end) {
          errors.endDate = "End date conflicts with an existing booking";
          conflict = true;
        }
  
        if (startTime < start && endTime > end) {
          errors.message = "Existing booking within date range specified";
          conflict = true;
        }
  
        if (conflict) {
          const err = new Error("Sorry, this spot is already booked for the specified dates");
          errors.bookingId = bookingId;
          err.errors = errors;
          err.title = "Forbidden"
          err.status = 403;
          return next(err);
        }
      }
    }
  
    next();

};

const validateDates = (req, res, next) => {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end <= start) {
      const error = new Error("Bad request");
      error.errors = { "endDate": "endDate cannot be on or before startDate" };
      error.status = 400;
      error.title = "Bad request";
      return next(error);
    } else {
        return next();
    }

};
const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .withMessage("Start Date is required"),
    check('endDate')
      .exists({ checkFalsy: true })
      .withMessage("End Date is required"),
    handleValidationErrors
  ]

router.post('/:spotId/bookings', authenUser, validSpot, notSpotOwner, validateBooking, validateDates, checkConflict, async (req, res, next)=> {
        const { spotId } = req.params;
        const userId = req.user.id;
        const { startDate, endDate } = req.body;
        const booking = await Booking.create({
            spotId: parseInt(spotId),
            userId,
            startDate,
            endDate
        })
         
          return res.json(booking)
    })

module.exports = router;