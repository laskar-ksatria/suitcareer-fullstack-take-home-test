const Ticket = require('../models/ticket');
const MyEvent = require('../models/event');
const Location = require('../models/location');
const { eventNames } = require('../models/event');

class TicketController {

    static readAll(req,res,next) {
        Ticket.find({})
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(next)
    };

    static readInfo(req,res,next) {
        Location.find({}).populate({
            path: "events",
            populate: {
                path: "tickets",
                model: "Ticket",
            }
        }).populate({
            path: 'events',
            populate: {
                path: 'schedule',
                model: "Schedule"
            }
        })
        .then(data => res.status(200).json(data))
        .catch(next)
    }

    static async create(req,res,next) {
        let { event_name, quota, location, price, ticket_type } = req.body;
        let formatingLocation = location.trim().toLowerCase();
        let formatingEventName = event_name.trim().toLowerCase();
        let formatingTicketType = ticket_type.trim().toLowerCase();
        let eventLocation;
        let newTicket
        Location.findOne({location: formatingLocation}).populate('events')
            .then(findLocation => {
                if (findLocation) {
                    eventLocation= findLocation;
                    let events = eventLocation.events
                    if (events) {
                        let findEvent;
                        events.forEach(item => {
                            if (item.name === formatingEventName) {
                                findEvent = item;
                            }
                        })  
                        if (findEvent) {
                            Ticket.create({price, quota, event: findEvent.id, ticket_type: formatingTicketType})
                                .then(ticket => {
                                    let { _id } = ticket;
                                    newTicket = ticket
                                    MyEvent.updateOne({_id: findEvent.id}, {$push: {tickets: _id}}, {omitUndefined:true})
                                        .then(updateEvent => {
                                            Ticket.findOne({_id: newTicket.id}).populate('event')
                                                .then(value => {
                                                    res.status(201).json({message: "Ticket has been added", ticket: value})                                            
                                                })
                                        })
                                })
                        }else {
                            next({message: "Event not found in location"})
                        }
                    }else {
                        next({message: "Event not found in location"})
                    }
                }else {
                    next({message: "Location not found"})
                }
            })
            .catch(next)
    };

};



module.exports = TicketController;