const Sequelize = require('sequelize');
const db = require('../db');
const LineItem = require('./LineItem')

const Order = db.define('order', {
    address: Sequelize.STRING,
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'Created'
    }
}, {
        hooks: {
            beforeUpdate: function (item) {
                if (!item.isCart && !item.address) {
                    throw new Error('address required');
                }
            }
        }
    });

Order.updateLineItem = function (cartId, quantity, productId) {
    return Order.findById(cartId, { include: LineItem })
        .then(cart => {
            let lineItem = cart.lineItems.find(item => item.productId === productId);
            if (quantity === 0) {
                lineItem.destroy();
            }
            if (lineItem) {
                lineItem.quantity += quantity;
                return lineItem.save();
            }
            return db.models.lineItem.create({
                orderId: cart.id,
                productId,
                quantity
            });
        });
};

Order.getCart = function (userId) {
    return Order.findOne({
        where: { isCart: true, userId }
    })
        .then(order => {
            if (!order) {
                return Order.create({userId});
            }
            return order;
        })
        .then(order => {
            return Order.findById(order.id, {
                include: {
                    model: db.models.lineItem,
                    include: [db.models.product]
                }
            });
        });
};

module.exports = Order;
