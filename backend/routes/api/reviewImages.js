const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const images = await ReviewImage.findAll({
        include: {
            model: Review
        }
    });
    res.json(images);
});

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const user = req.user;

    const reviewImage = await ReviewImage.findByPk(imageId);

    if (!reviewImage) {
        const err = new Error();
        err.message = "Review Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    const review = await Review.findByPk(reviewImage.reviewId);
    if (review.userId !== user.id) {
        const err = new Error();
        err.title = "Authorization required";
        err.message = "Forbidden";
        res.status(403);
        return res.json(err);
    }

    await reviewImage.destroy();

    res.json({
        message: "Successfully deleted"
    });
})
    
        module.exports = router;