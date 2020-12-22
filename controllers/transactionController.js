const Transaction = require('../models/transaction');
const Event = require('../models/event');
const Location = require('../models/location');
const Ticket = require('../models/ticket')

class TrasactionController {

    static readMe(req, res, next) {
        let { username } = req.body
        Transaction.find({username}).populate('event')
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
        // try {
        //     let LocEvent = await Event.findOne({ name: formatingEventName, location: formatingLocation })
        //     if (allEvents) {
        //         console.log(allEvents);
        //         // let userTransaction = [];
        //         // for (let i = 0; i < allEvents.length; i++) {
        //         //     let { ticket_type, price, quota, _id, name } = allEvents[i]
        //         //     for (let j = 0; j < tickets_info.length; j++) {
        //                 // let item = tickets_info[j]
        //                 // let total = Number(item.quantity) * Number(price);
        //                 // if (item.ticket_type === ticket_type) {
        //                 //     if (quota > item.quantity) {
        //                 //        let myTrade = await Transaction.create({ username,  total, quantity: item.quantity, event: _id})
        //                 //         userTransaction.push(myTrade);
        //                 //        await Event.updateOne({name, ticket_type}, {$inc: {quota: -item.quantity}}, {omitUndefined: true})
        //                 //     };
        //                 // };
        //             // };
        //         };

        //         res.status(202).json({message: "Transaction has been maded"});

        //     } else {
        //         next({ message: "Event not found, please fill correctly" })
        //     }
        // } catch (error) {
        //     next(error)
        // }
    };
    // [
    //     {
    //         ticket_type: "",
    //         quantity: "",

    //     }
    // ]

    static readInfo(req, res, next) {

    }

};

module.exports = TrasactionController;