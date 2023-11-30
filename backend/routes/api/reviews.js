const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, SpotImage, Review } = require('../../db/models');
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
    const { reviewId } = req.params;
    const { user } = req;

    const review = await Review.findByPk(reviewId);
    if(review) {
        if(review.userId == user.id) {
            next()
        } else {
            return res.status(403).json({"message": "Forbidden"})}
        } else {
            return res.status(404).json({"message": "Review couldn't be found"})}
        }
    
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


router.get('/current', authenUser, async (req, res, next) => {
    const user = req.user;
   
    let reviews = await user.getReviews({
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include:{
                model: SpotImage,
                attributes: ['url'],
                where:{
                    preview: true
                },
                required: false
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
    ]
    })
  

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i];
    
        if (review.Spot.SpotImages.length > 0) {
           url = review.Spot.SpotImages[0].url;
        }
    
        review = review.toJSON();
        review.Spot.previewImage = url;
        delete review.Spot.SpotImages;
    
        reviews[i] = review;
    }

        res.json({"Reviews": reviews});
    })

router.post('/:reviewId/images', authenUser, authorUser, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    let reviewImagePost = {};

    const reviewImages = await ReviewImage.findAll({
        where: {reviewId}
    });
    
    if (reviewImages.length < 10) {
        const imagePost = await ReviewImage.create({
            reviewId, url
        })

        reviewImagePost.id = imagePost.id;
        reviewImagePost.url = url;
        res.json(reviewImagePost);
    } else {
        return res.status(403).json({
            "message": "Maximum number of images for this resource has been reached"
        })
    }

})

router.put('/:reviewId', authenUser, authorUser, validateReview, async(req, res, next)=> {
    const { review, stars } = req.body;
    const editReview = await Review.findByPk(req.params.reviewId);

    editReview.review = review;
    editReview.stars = stars;

    editReview.save();
    res.json(editReview);
})

router.delete('/:reviewId', authenUser, authorUser, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    await review.destroy();
    res.json({
        "message": "Successfully deleted"
    })
})




module.exports = router;