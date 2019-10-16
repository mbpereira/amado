const { Order } = require('../models')
const { transaction } = require('objection')

class OrderController {
    static index(req, res, next) {
        const userId = req.userId

        Order.query().where('id_customer', userId)
            .eager('[items, delivery, customer]')
            .then(orders => res.status(200).send(orders))
            .catch(next)
    }
    static async store(req, res, next) {

        const id_customer = req.userId
        const { delivery_addr, items } = req.body

        try {
            await transaction(Order, async (BoundOrder) => {

                const order = await BoundOrder.query().insert({
                    id_customer,
                    delivery_addr,
                    status: 0
                })
                .returning('*')

                await Promise.all(items.map(
                    async item => order
                        .$relatedQuery('items')
                        .insert({
                            id_stock: item.id_stock,
                            quantity: item.quantity
                        })
                ))

                return res.status(201).send(order)
            })
        } catch (e) {
            next(e)
        }
    }
    static show(req, res, next) {}
    static cancel(req, res, next) {}
}

module.exports = OrderController