const Location = require('../models/location');

class LocationController {

    static readAll(req,res,next) {
        Location.find({}).populate('events')
            .then(locations => {
                res.status(200).json(locations)
            }) 
            .catch(next)
    };

    static create(req,res,next) {
        let { name } = req.body;
        let formatingName = name.trim().toLowerCase();
        Location.create({location: formatingName})
            .then(location => {
                res.status(200).json({message: "Location has been added", location})
            })
            .catch(next)
    };

};

module.exports = LocationController;