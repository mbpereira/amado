const { Order } = require('../models')
const { transaction } = require('objection')

class OrderController {
    static index(req, res, next) {
        const limit = Number(req.query.limit)
        const userId = req.userId

        const query = Order.query()
        
        if(limit && !isNaN(limit))
            query.limit(Number(limit))
        
        
        query.where('orders.id_customer', userId)
            .eager('[items, delivery]')
            .modifyEager('items', 
                builder => builder
                    .select([
                        'order_items.*',
                        'stocks.option',
                        'stocks.price',
                        'stocks.cost',
                        'colors.id as id_color',
                        'colors.name as color_name',
                        'products.name as product_name',
                        'products.id as id_product',
                        'products.code',
                        'products.id_category',
                    ])
                    .join('stocks', 'order_items.id_stock', 'stocks.id')
                    .join('colors', 'stocks.id_color', 'colors.id')
                    .join('products', 'colors.id_product', 'products.id')
            )
            .orderBy('created_at', 'DESC')
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