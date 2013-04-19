'use strict';

var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')

var logger = require('../logger')

module.exports = OrderManager

function OrderManager(){
    var self = this
    self.orders = {}
}

inherits(OrderManager, EventEmitter)

OrderManager.prototype.addOrder = function(order){
    var self = this
    var orders = self.orders
    var id = order.id
    order.on('init', function() {
        orders[id] = order
    })
    order.on('destroy', function() {
        delete self.orders[id]
    })
}

OrderManager.prototype.removeOrder = function(orderId){
    var self = this
    var orders = self.orders
    delete orders[orderId]
}

OrderManager.prototype.getOrder = function(orderId){
    var self = this
    var orders = self.orders
    return orders[orderId]
}