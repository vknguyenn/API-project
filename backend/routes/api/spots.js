const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
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
    




router.get('/current', requireAuth, async(req, res, next)=> {
    const { id } = req.user;
    
    const spots = await Spot.findAll({
        where: {ownerId: id}
    })
    res.json({Spots: spots})
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
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    return res.json({spots})
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


module.exports = router;