/* eslint-disable */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

require('chai').should();

const _timeout = 90000;
const NS = 'org.example.phoenicia';
const orderNo = '12345';
const buyerID = 'buyer@email.com';
const sellerID = 'seller@email.com';
const vendorID = 'vendor@email.com';
const shipperID = 'shipper@email.com';
const bankID = 'bank@email.com';
const returnorder = 'order received, products on backorder. Will be shipped in 2 weeks.';
let shipper;
let vendor;
let bank;
let orderAmount = 0;
let orderStatus = {
    'Created': {'code': 1, 'text': 'Order Created'},
    'Bought': {'code': 2, 'text': 'Order Purchased'},
    'Cancelled': {'code': 3, 'text': 'Order Cancelled'},
    'Ordered': {'code': 4, 'text': 'Order Submitted to Provider'},
    'ShipRequest': {'code': 5, 'text': 'Shipping Requested'},
    'Delivered': {'code': 6, 'text': 'Order Delivered'},
    'Delivering': {'code': 15, 'text': 'Order being Delivered'},
    'OrderReturn': {'code': 7, 'text': 'Order Returned'},
    'PaymentReq': {'code': 10, 'text': 'Payment Requested'},
    'Paid': {'code': 14, 'text': 'Payment Processed'},
    'RefundReq': {'code': 12, 'text': 'Order Refund Requested'},
    'Refunded': {'code': 13, 'text': 'Order Refunded'},
    'ReturnOrderTovendor': { code:14, text : 'Return Order to Vendor'}
};

/**
 * create an empty order
 * @param {createOrderTemplate} _inbound - Order created with factory.newResource(NS, 'Order', orderNo)
 * @returns {Order} - updated order item with all required fields except for relationships (buyer, seller)
 * @utility
 */
function createOrderTemplate (_inbound)
{
    _inbound.orderID = '';
    _inbound.amount = 0;
    _inbound.product = [];
    _inbound.status = JSON.stringify(orderStatus.Created);
    _inbound.created = new Date().toISOString();
    _inbound.cancelled = '';
    _inbound.ordered = '';
    _inbound.bought = '';
    _inbound.TotalBalance = '';
    _inbound.returnOrderToVendorDate = '';
    _inbound.returnOrderDate= '';
    _inbound.requestShipment = '';
    _inbound.delivered = '';
    _inbound.delivering = '';
    _inbound.orderRefunded = '';
    _inbound.paymentRequestDate = '';
    _inbound.payDate = '';
    _inbound.returnorder = '';
    _inbound.refund = '';
    return(_inbound);
}
/**
 * update an empty order with 4 items. update the amount field based on the sum of the line items
 * @param {addItems} _inbound - Order created with factory.newResource(NS, 'Order', orderNo)
 * @returns {Order} - updated order item with all required fields except for relationships (buyer, seller)
 * @utility
 */
function addItems (_itm)
{
    _itm.product.push('{"itemNo": 1, "itemDescription": "Macbook Pro 16Gb, 1Tb", "quantity": 2, "unitPrice": 1285, "extendedPrice": 3470}');
    _itm.product.push('{"itemNo": 2, "itemDescription": "Macbook Pro 8Gb, .5Tb", "quantity": 3, "unitPrice": 985, "extendedPrice": 2955}');
    _itm.product.push('{"itemNo": 3, "itemDescription": "Lenovo Thinkpad W520 16Gb, .25Tb", "quantity": 1, "unitPrice": 500, "extendedPrice": 500}');
    _itm.product.push('{"itemNo": 4, "itemDescription": "Lenovo Thinkpad W520 32Gb, 1Tb", "quantity": 4, "unitPrice": 1565, "extendedPrice": 6260}');
    _itm.amount = JSON.parse(_itm.product[0]).extendedPrice;
    _itm.amount += JSON.parse(_itm.product[1]).extendedPrice;
    _itm.amount += JSON.parse(_itm.product[2]).extendedPrice;
    _itm.amount += JSON.parse(_itm.product[3]).extendedPrice;
    orderAmount= _itm.amount;
    return (_itm);
}

describe('Shipping Application', function () {
    this.timeout(_timeout);
    let businessNetworkConnection;
    // beforeEach
    // connect

    // afterEach
    // wipe ledger after each


    before(function () {
        businessNetworkConnection = new BusinessNetworkConnection();
        return businessNetworkConnection.connect('admin@sc-maher');
    });

    describe('#createOrder', () => {

        // before()

        it('should be able to create an order', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
            // create the Buyer
            const buyer = factory.newResource(NS, 'Buyer', buyerID);
            buyer.companyName = 'billybob computing';

            // create the Seller
            const seller = factory.newResource(NS, 'Seller', sellerID);
            seller.companyName = 'Simon PC Hardware, Inc';

            // create the Vendor
            vendor = factory.newResource(NS, 'Vendor', vendorID);
            vendor.companyName = 'Ginsu Knife Specialists';

            // create the Shipper
            shipper = factory.newResource(NS, 'Shipper', shipperID);
            shipper.companyName = 'Fastest Ever Shippers';

            // create the Bank
            bank = factory.newResource(NS, 'Bank', bankID);
            bank.companyName = 'The Global Financier';

            // create the Order
            let order = factory.newResource(NS, 'Order', orderNo);
            order = createOrderTemplate(order);
            order = addItems(order);
            order.orderNumber = orderNo;

            // create the buy transaction
            const createNew = factory.newTransaction(NS, 'CreateOrder');

            order.buyer = factory.newRelationship(NS, 'Buyer', buyer.$identifier);
            order.seller = factory.newRelationship(NS, 'Seller', seller.$identifier);
            order.vendor = factory.newRelationship(NS, 'Vendor', vendor.$identifier);
            order.shipper = factory.newRelationship(NS, 'Shipper', shipper.$identifier);
            order.bank = factory.newRelationship(NS, 'Bank', bank.$identifier);
            createNew.bank = factory.newRelationship(NS, 'Bank', bank.$identifier);
            createNew.order = factory.newRelationship(NS, 'Order', order.$identifier);
            createNew.buyer = factory.newRelationship(NS, 'Buyer', buyer.$identifier);
            createNew.seller = factory.newRelationship(NS, 'Seller', seller.$identifier);
            createNew.amount = order.amount;
            JSON.parse(order.status).text.should.equal(orderStatus.Created.text);
            order.amount.should.equal(orderAmount);
            createNew.amount.should.equal(orderAmount);
            createNew.order.$identifier.should.equal(orderNo);

            // Get the asset registry.
            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {

                    // add the order to the asset registry.
                    return assetRegistry.add(order)
                        .then(() => {
                            return businessNetworkConnection.getParticipantRegistry(NS + '.Buyer');
                        })
                        .then((participantRegistry) => {
                            // add the buyer and seller
                            return participantRegistry.addAll([buyer, seller, shipper, vendor]);
                        })
                        .then(() => {
                            // submit the transaction
                            return businessNetworkConnection.submitTransaction(createNew);
                        })
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should not be simon
                            newOrder.buyer.$identifier.should.equal(buyerID);
                        });
                });
        });
    });

    describe('#issueBuyRequest', () => {

        it('should be able to issue a buy request', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the buy transaction
            const buyNow = factory.newTransaction(NS, 'Buy');

            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);
                    buyNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    buyNow.buyer = newOrder.buyer;
                    buyNow.seller = newOrder.seller;
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(buyNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            newOrder.buyer.$identifier.should.equal(buyerID);
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.Bought.text);
                        });

                });
        });
    });

    describe('#issueOrderFromVendor', () => {

        it('should be able to issue a Vendor order', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the buy transaction
            const orderNow = factory.newTransaction(NS, 'OrderFromVendor');

            return businessNetworkConnection.getParticipantRegistry(NS + '.Bank')
                .then(() => {
                    return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                })
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.bank = factory.newRelationship(NS, 'Bank', bankID);
                    orderNow.seller = factory.newRelationship(NS, 'Seller', sellerID);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.Ordered.text);
                        });

                });
        });
    });
    describe('#issueRequestShipment', () => {

        it('should be able to issue a request to ship product', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the buy transaction
            const orderNow = factory.newTransaction(NS, 'RequestShipping');

            return businessNetworkConnection.getParticipantRegistry(NS + '.Shipper')
                .then((participantRegistry) => {
                    // add the shipper
                    return participantRegistry.addAll([shipper]);
                })
                .then(() => {
                    return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                })
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.vendor = factory.newRelationship(NS, 'Vendor', vendorID);
                    orderNow.shipper = factory.newRelationship(NS, 'Shipper', shipperID);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.ShipRequest.text);
                        });

                });
        });
    });
    describe('#issueDelivery', () => {

        it('should be able to record a product delivery', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the Deliver transaction
            const orderNow = factory.newTransaction(NS, 'Deliver');

            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.shipper = factory.newRelationship(NS, 'Shipper', shipperID);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.Delivered.text);
                        });

                });
        });
    });

    describe('#issueRequestPayment', () => {

        it('should be able to issue a request to request payment for a product', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the buy transaction
            const orderNow = factory.newTransaction(NS, 'RequestPayment');

            return businessNetworkConnection.getParticipantRegistry(NS + '.Bank')
                .then((participantRegistry) => {
                    // add the Bank
                    return participantRegistry.addAll([bank]);
                })
                .then(() => {
                    return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                })
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.bank = factory.newRelationship(NS, 'Bank', bankID);
                    orderNow.seller = factory.newRelationship(NS, 'Seller', newOrder.seller.$identifier);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.PaymentReq.text);
                        });
                });
        });
    });

    describe('#Pay', () => {

        it('should be able to record an order payment', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the Deliver transaction
            const orderNow = factory.newTransaction(NS, 'Pay');

            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.bank = factory.newRelationship(NS, 'Bank', bankID);
                    orderNow.seller = factory.newRelationship(NS, 'Seller', newOrder.seller.$identifier);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.Paid.text);
                        });

                });
        });
    });

    describe('#issueReturnOrder', () => {

        it('should be able to record a product ReturnOrder', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the Deliver transaction
            const orderNow = factory.newTransaction(NS, 'ReturnOrder');

            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.returnorder = returnorder;
                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.vendor = factory.newRelationship(NS, 'Vendor', vendorID);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            newOrder.returnorder.should.equal(returnorder);
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.OrderReturn.text);
                        });

                });
        });
    });
    describe('#issueCancel', () => {

        it('should be able to record an order cancellation', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the Deliver transaction
            const orderNow = factory.newTransaction(NS, 'OrderCancel');

            return businessNetworkConnection.getAssetRegistry(NS + '.Order')
                .then((assetRegistry) => {
                    // re-get the commodity
                    return assetRegistry.get(orderNo);
                })
                .then((newOrder) => {
                    newOrder.buyer.$identifier.should.equal(buyerID);
                    newOrder.$identifier.should.equal(orderNo);

                    orderNow.order = factory.newRelationship(NS, 'Order', newOrder.$identifier);
                    orderNow.seller = factory.newRelationship(NS, 'Seller', newOrder.seller.$identifier);
                    orderNow.buyer = factory.newRelationship(NS, 'Buyer', newOrder.buyer.$identifier);
                    // submit the transaction
                    return businessNetworkConnection.submitTransaction(orderNow)
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Order');
                        })
                        .then((assetRegistry) => {
                            // re-get the commodity
                            return assetRegistry.get(orderNo);
                        })
                        .then((newOrder) => {
                            // the owner of the commodity should be buyer
                            JSON.parse(newOrder.status).text.should.equal(orderStatus.Cancelled.text);
                        });

                });
        });
    });

});
