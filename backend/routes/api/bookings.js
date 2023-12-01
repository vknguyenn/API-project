const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, SpotImage, Review, Booking } = require('../../db/models');
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
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await Booking.findByPk(bookingId);
    if(booking) {
        if(booking.userId == user.id) {
            next()
        } else {
            return res.status(403).json({"message": "Forbidden"})}
        } else {
            return res.status(404).json({"message": "Booking couldn't be found"})}
        }


router.get('/current', authenUser, async(req, res) => {
    const user = req.user;

    let bookings = await user.getBookings({
        include: [{
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                attributes: ['url'],
                where: {
                    preview: true
                }
            }
        }]
    });


    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];
    
        if (booking.Spot.SpotImages.length > 0) {
           url = booking.Spot.SpotImages[0].url;
        }
    
        booking = booking.toJSON();
        booking.Spot.previewImage = url;
        delete booking.Spot.SpotImages;
    
        bookings[i] = booking;
    }

   

    res.json({Bookings: bookings})

})



const validBooking = async (req, res, next)=> {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
  
    if (booking) {
      next();
    } else {
      return res.status(404).json({
        "message": "Booking couldn't be found"
      })
    }
  
  }
  const bookingOwner = async function (req, res, next) {
    const { bookingId } = req.params;
    const user = req.user;
  
    const booking = await Booking.findByPk(bookingId);
  
    if (booking.userId == user.id) {
       next();
    } else {
        const err = new Error('Forbidden');
        err.title = 'Authorization required';
        err.status = 403;
        return next(err);
    }
    // next();
  }

const pastEndDate = async (req, res, next)=> {
    const { bookingId } = req.params
  
    const booking = await Booking.findByPk(bookingId);
  
    const endDateTime = new Date(booking.endDate).getTime();
    const currentTime = new Date().getTime();
    // if (process.env.NODE_ENV === 'development') {
    //     next();
    //     return;
    //   }
    if (currentTime > endDateTime) {
      const err = new Error("Past bookings can't be modified");
      err.status = 403;
      err.title = "Forbidden";
      return next(err);
    }
  
    next();
  }
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

router.put('/:bookingId', authenUser, validBooking, bookingOwner, validateDates, validateBooking, pastEndDate, async(req, res, next)=> {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    if (req.body.startDate) {
        booking.startDate = req.body.startDate;
    }

    if (req.body.endDate) {
        booking.endDate = req.body.endDate;
    }

    await booking.save();

    res.json(booking);
})

router.delete('/:bookingId', authenUser, async (req, res, next)=> {
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await Booking.findByPk(bookingId);
    if (booking) {
        if (booking.userId == user.id) {
            const start = Date.parse(booking.startDate);
            
            if (start < Date.now()) {
                return res.status(403).json({
                    message: "Bookings that have been started can't be deleted"
                })
            }
            await booking.destroy();

            return res.json({
                message: "Successfully deleted"
            })
        } else { return res.status(403).json({message: "Forbidden"})}


    } else { return res.status(404).json({
        message:"Booking couldn't be found"
    })}
})


module.exports = router;