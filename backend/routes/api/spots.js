const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
    
    let spot = await Spot.findByPk(id);

    const numReviews = await Review.count({
        where: {spotId: id}
    })

    const sumReview = await Review.sum('stars', {
        where: {spotId: id}
    });


    const avgRating = sumReview / numReviews;

    const previewImage = await SpotImage.findOne({
        attributes: ['url'],
        where: {spotId: id}
    })
    spot = spot.toJSON();
    spot.avgRating = avgRating;
    spot.previewImage = previewImage;

    res.json({Spots: [spot]})
})

router.get('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId);
    if (spot) {
        
            const numReviews = await Review.count({
                where:{spotId: spot.id}
            })
            
            const sumReview = await Review.count({
                where: {spotId: spot.id}
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
            spot.Owner = await User.findByPk(spot.ownerId, {
                attributes: ['id', 'firstName', 'lastName']
            })
            
            return res.json(spot)
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    
    
})



router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
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
            // attributes: ['url'],
            where: {spotId: spot.id}
        })
        spot = spot.toJSON();
        if (avgRating) spot.avgRating = avgRating;
        if(previewImage) spot.previewImage = previewImage.url;
        allSpots.push(spot);
    }

    return res.json({Spots: allSpots})
}
)


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
      check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
      check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
      check('name')
      .exists({ checkFalsy: true })
      .withMessage('Name must be less than 50 characters'),
      check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
      check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

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

router.post('/:spotId/images', authenUser, authorUser, async(req, res) =>  {
    const newImage = {};
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const spotImage = await SpotImage.create({spotId, url, preview});

    newImage.spotId = spotId;
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


router.get('/:spotId/reviews', authorUser, async (req, res) => {
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

    const reviewPost = await Review.create({
        spotId: parseInt(spotId),
        userId,
        review,
        stars
    })

    const reviews = await Review.findAll({
        where: {spotId}
    })

    // for(let review of reviews) {
    //     if (review.userId == userId) {
    //         return res.status(500).json({
    //             "message": "User already has a review for this spot"
    //         })
    //     }
    // }
    res.status(201).json(reviewPost)
})

module.exports = router;