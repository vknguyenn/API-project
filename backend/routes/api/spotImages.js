const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const user = req.user;

    const spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        const err = new Error();
        err.message = "Spot Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    const spot = await Spot.findByPk(spotImage.spotId);
    if (spot.ownerId !== user.id) {
        const err = new Error();
        err.title = "Authorization required";
        err.message = "Forbidden";
        res.status(403);
        return res.json(err);
    }

    await spotImage.destroy();

    res.json({
        message: "Successfully deleted"
    });
})
    
        module.exports = router;