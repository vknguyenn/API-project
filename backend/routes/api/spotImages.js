const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params
    const userId = req.user.id
    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }
   

    const spot = await Spot.findByPk(spotImage.spotId)
    const ownerId = spot.ownerId



    if (ownerId !== userId) {
        const err = new Error("Forbidden")
        err.title = 'Forbidden';
        err.status = 403;
        return next(err);
    }

    else {
        await spotImage.destroy()
        return res.status(200).json({
            message: "Successfully deleted"
        })
    }

})
    
        module.exports = router;