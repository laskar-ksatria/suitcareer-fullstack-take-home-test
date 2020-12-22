const Transaction = require('../models/transaction');
const Event = require('../models/event');
const Location = require('../models/location');
const Ticket = require('../models/ticket')

class TrasactionController {

    static readInfo(req, res, next) {
        Transaction.find({}).populate('event')
            .then(value => res.status(200).json(value))
            .catch(next)
    };

    static async create(req, res, next) {
        let { event_name, tickets_info, location, username } = req.body;
        let formatingEventName = event_name.trim().toLowerCase();
        let formatingLocation = location.trim().toLowerCase();

        try {
            let locEvent = await Event.findOne({ name: formatingEventName, location: formatingLocation }).populate('tickets')
            let allTickets = locEvent.tickets;
            allTickets.forEach( async (item) => {
                let isQuota;
                let { ticket_type, price, quota,  } = item;
                for(let i = 0; i < tickets_info.length; i++) {
                    let item2 = tickets_info[i]
                    if (ticket_type === item2.ticket_type) {
                        if (quota > item2.quantity) {
                            let total = Number(item2.quantity) * Number(price);
                            await Transaction.create({username, total, event: locEvent.id})
                            await Ticket.updateOne({_id: item.id}, {$inc: {quota: -item2.quantity}}, {omitUndefined: true})
                        }else {
                            isQuota.ticket_type = ticket_type
                        }
                    }
                }
            })
            if (isQuota) {
                next({message: `${isQuota.ticket_type} quota is not enought`})
            }else {
                res.status(200).json({message: "All transaction success"})
            }
        } catch (error) {
            next(error)
        }
    };
    static readInfo(req, res, next) {

    }

};

module.exports = TrasactionController;