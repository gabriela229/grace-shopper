const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    address: Sequelize.STRING,
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

Order.updateFromRequestBody = function (id, body) {
    return Order.findById(id)
        .then(order => {
            Object.assign(order, body);
            return order.save();
        });
};

Order.destroyLineItem = function (orderId, lineItemId) {
    return conn.models.lineItem.destroy({
        where: {
            id: lineItemId,
            orderId
        }
    });
};

Order.getOrders = function () {
    return Order.findAll({
        order: [['id', 'DESC']],
        where: {
            isCart: false
        },
        include: {
            model: conn.models.lineItem,
            include: [conn.models.product]
        }
    });
};

Order.addProductToCart = function (productId) {
    return this.getCart()
        .then(cart => {
            let lineItem = cart.lineItems.find(lineItem => lineItem.productId === productId);
            if (lineItem) {
                lineItem.quantity++;
                return lineItem.save();
            }
            return conn.models.lineItem.create({
                orderId: cart.id,
                productId: productId
            });
        });
};

Order.getCart = function () {
    return Order.findOne({
        where: { isCart: true },
    })
        .then(order => {
            if (!order) {
                return Order.create({});
            }
            return order;
        })
        .then(order => {
            return Order.findById(order.id, {
                include: {
                    model: conn.models.lineItem,
                    include: [conn.models.product]
                }
            });
        });
};

module.exports = Order;