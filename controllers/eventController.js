const MyEvent = require('../models/event');
const Location = require('../models/location');
const Schedule = require('../models/schedule');

class EventController {

    static readAll(req, res,next) {
        MyEvent.find({})
            .then(events => res.status(200).json(events))
            .catch(next)
    };

    static async create(req,res,next) {

        let { name, location, start, end } = req.body;
        try {
            let formatingName = name.trim().toLowerCase();
            let formatingLocation = location.trim().toLowerCase();
            let startDate = new Date(start);
            let endDate = new Date(end);

            let findLocation = await Location.findOne({location: formatingLocation})
            if (findLocation) {
                let findSameEvent = await MyEvent.findOne({name: formatingName, location: formatingLocation})
                if (findSameEvent) {
                    next({message: "Event already registered in that location"})
                }else {
                    let newEvent = await MyEvent.create({name: formatingName, location: formatingLocation})
                    let newSchedule  = await Schedule.create({start: startDate, end: endDate, event: newEvent.id})
                    let updateEvent = await MyEvent.findOneAndUpdate(
                        {_id: newEvent.id}, {schedule: newSchedule.id}, 
                        {omitUndefined: true, new: true})
                    let newUpdateEvent = await MyEvent.findOne({_id: updateEvent.id}).populate('schedule')
                    res.status(202).json({message: "Event has been added", newEvent: newUpdateEvent})
                    await Location.updateOne({_id: findLocation.id}, {$push: {events: newEvent.id}}, {omitUndefined: true})
                }
            }else {
                next({message: "Location that you input is not found, please fill correctly"})
            }
        } catch (error) {
            next(error)
        }
    };

};

module.exports = EventController;