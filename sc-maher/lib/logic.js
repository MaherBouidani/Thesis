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

var StatusList = {
    "OrderCreateStatus": "Created Order",
    "OrderBuyStatus": "Bought Order",
    "OrderCancelStatus": "Cancelled Order",
    "OrderFromVendorStatus": "Seller Sent Order to the Vendor",
    "ShipRequestStatus": "Vendor Requests Shipper to Ship Order",
    "DeliveredStatus": "Deliver Order",
    "InDeliveringStatus": "Order On The Way",
    "OrderReturnStatus": "Return Order to Seller",
    "PaymentReq": "Seller Requests Bank to Pay",
    "PayStatus": "Payment Processed",
    "RefundReq": "Bank Requests Seller to Pay Back",
    "Refunded": "Refunded Order",
    "ReturnOrderVendorStatus": "Returned Order to Vendor"
};

/**
 *Buyer create an order to Buy
 * @param {org.example.phoenicia.CreateOrder} tx - the order to be processed
 * @transaction
 */
function CreateOrder(tx) {
    tx.order.buyer = tx.buyer;
    tx.order.quantity = tx.quantity;
    tx.order.product = tx.product;
    tx.order.OrderCreatedDate = new Date().toISOString();
    tx.order.status = JSON.stringify(StatusList.OrderCreateStatus);
    return getAssetRegistry('org.example.phoenicia.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.order);
        });
}
/**
 * @param {org.example.phoenicia.Buy} tx - the order to be processed
 * @transaction
 */
function Buy(tx) {
    if (tx.order.status == JSON.stringify(StatusList.OrderCreateStatus))
    {
        tx.order.buyer = tx.buyer;
        tx.order.seller = tx.seller;
        tx.order.OrderBuyDate = new Date().toISOString();
        tx.order.status = JSON.stringify(StatusList.OrderBuyStatus);
        const buy = getFactory().newEvent('org.example.phoenicia', 'BuyNotification');
        buy.order = tx.order;
        buy.seller = tx.order.seller;
        emit(buy);
        return getAssetRegistry('org.example.phoenicia.Order')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
    }
    else {
        throw new Error ('Create the order first');
    }
}
/**
 * @param {org.example.phoenicia.CancelOrder} tx - the order to be processed
 * @transaction
 */
function CancelOrder(tx) {
    if ((tx.order.status == JSON.stringify(StatusList.OrderCreateStatus)) || (tx.order.status == JSON.stringify(StatusList.OrderBuyStatus)))
    {
        tx.order.buyer = tx.buyer;
        tx.order.seller = tx.seller;
        tx.order.OrderCancelDate = new Date().toISOString();
        tx.order.ReasonForCancelling = tx.ReasonForCancelling;
        tx.order.status = JSON.stringify(StatusList.OrderCancelStatus);
        const cancel = getFactory().newEvent('org.example.phoenicia', 'CancelNotification');
        cancel.order = tx.order;
        cancel.buyer = tx.order.buyer;
        emit(cancel);
        return getAssetRegistry('org.example.phoenicia.Order')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
        }
}
/**
 * @param {org.example.phoenicia.OrderFromVendor} tx - the order to be processed
 * @transaction
 */
function OrderFromVendor(tx) {
    if (tx.order.status == JSON.stringify(StatusList.OrderBuyStatus))
    {
        tx.order.vendor = tx.vendor;
        tx.order.OrderVendorDate = new Date().toISOString();
        tx.order.status = JSON.stringify(StatusList.OrderFromVendorStatus);
        const vendorNotify = getFactory().newEvent('org.example.phoenicia', 'VendorNotification');
        vendorNotify.order = tx.order;
        vendorNotify.vendor = tx.order.vendor;
        emit(vendorNotify);
        return getAssetRegistry('org.example.phoenicia.Order')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
    }
    else {
        throw new Error ('The vendor has already received this order');
    }
}
/**
 * @param {org.example.phoenicia.RequestShipping} tx - the order to be processed
 * @transaction
 */
function RequestShipping(tx) {
    if (tx.order.status == JSON.stringify(StatusList.OrderFromVendorStatus))
    {
        tx.order.shipper = tx.shipper;
        tx.order.requestShipmentDate = new Date().toISOString();
        tx.order.status = JSON.stringify(StatusList.ShipRequestStatus);
        return getAssetRegistry('org.example.phoenicia.Order')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
        }
    else {
        throw new Error ('The order has already been requested for shipping');
    }
}
/**
 * @param {org.example.phoenicia.InDelivering} tx - the order to be processed
 * @transaction
 */
function InDelivering(tx) {
    if (tx.order.status == JSON.stringify(StatusList.ShipRequestStatus))
    {
        tx.order.deliveringDate = new Date().toISOString();
        tx.order.status = JSON.stringify(StatusList.InDeliveringStatus);
        const onroute = getFactory().newEvent('org.example.phoenicia', 'OnRouteNotification');
        onroute.order = tx.order;
        onroute.buyer = tx.order.buyer; 
        emit(onroute);
        return getAssetRegistry('org.example.phoenicia.Order')   
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
        }
    else if (tx.order.status == JSON.stringify(StatusList.DeliveredStatus))
    {
        throw new Error ('The buyer has already received this order');
    }
    else {
        throw new Error ('The order has not been requested for shipping yet');
    }
}
/**
 * @param {org.example.phoenicia.Deliver} tx - the order to be processed
 * @transaction
 */
function Deliver(tx) {
        tx.order.deliveredDate = new Date().toISOString();
        tx.order.status = JSON.stringify(StatusList.DeliveredStatus);
        const delivered = getFactory().newEvent('org.example.phoenicia', 'DeliveredNotification');
        delivered.order = tx.order;
        delivered.buyer = tx.order.buyer;
        emit(delivered);
        return getAssetRegistry('org.example.phoenicia.Order')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.order);
            });
}
 /**
 * @param {org.example.phoenicia.PaymentReq} tx- the order to be processed
 * @transaction
 */
function PaymentReq(tx) {
    if (tx.order.status == JSON.stringify(StatusList.DeliveredStatus))
        {
        tx.order.totalBalanceDue = tx.totalBalanceDue;
        tx.order.bank = tx.bank;
        tx.order.status = JSON.stringify(StatusList.PaymentReq);
        tx.order.paymentRequestDate = new Date().toISOString();
        
    return getAssetRegistry('org.example.phoenicia.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.order);
        });
    }
    else if (tx.order.status == JSON.stringify(StatusList.InDeliveringStatus)) {
        throw new Error ('The order is still on route and payment Request is not allowed');
    }
    else {
        throw new Error ('The order has been already requested for payment');
    }
}
 /**
 * @param {org.example.phoenicia.Pay} tx - the order to be processed
 * @transaction
 */
function Pay(tx) {
    if (tx.order.status == JSON.stringify(StatusList.PaymentReq))
    {
        tx.order.status = JSON.stringify(StatusList.PayStatus);
        tx.order.payDate = new Date().toISOString();
        const paid = getFactory().newEvent('org.example.phoenicia', 'PaymentNotification');
        paid.order = tx.order;
        paid.seller = tx.order.seller;
        emit(paid);
        return getAssetRegistry('org.example.phoenicia.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.order);
        });
    }
    else if (tx.order.status = JSON.stringify(StatusList.PayStatus)){
        throw new Error ('The order has already been paid');
    }
}
/**
 * @param {org.example.phoenicia.RefundRequest} tx - the order to be processed
 * @transaction
 */
function RefundRequest(tx) {
    if (tx.order.status == JSON.stringify(StatusList.OrderReturnStatus)){
    tx.order.status = JSON.stringify(StatusList.RefundReq);
    tx.order.RefundRequestDate = new Date().toISOString();

    return getAssetRegistry('org.example.phoenicia.Order')
    .then(function (assetRegistry) {
        return assetRegistry.update(tx.order);
      });
    }
    else if (tx.order.status = JSON.stringify(StatusList.RefundReq)) {
        throw new Error ('The order has already been requested for refund');
    }
    else {
        throw new Error ('The order has not been returned to Seller');
    }

}
 /**
 * Record a refund to the buyer
 * @param {org.example.phoenicia.Refund} tx - the order to be processed
 * @transaction
 */
function Refund(tx) {
    if (tx.order.status == JSON.stringify(StatusList.RefundReq)) {
        tx.order.status = JSON.stringify(StatusList.Refunded);
        tx.order.refundAmount= tx.refundAmount;
        tx.order.OrderRefundedDate = new Date().toISOString();
        const refunded = getFactory().newEvent('org.example.phoenicia', 'RefundNotification');
        refunded.order = tx.order;
        refunded.bank = tx.order.bank;
        emit(refunded);
        return getAssetRegistry('org.example.phoenicia.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.order);
        });
    }
    else if (tx.order.status = JSON.stringify(StatusList.Refunded)){
        throw new Error ('The order has already been refunded');
    }
}
 /**
 * Return Order to the Seller 
 * @param {org.example.phoenicia.ReturnOrder} tx - the order to be processed
 * @transaction
 */
function ReturnOrder(tx) {
        tx.order.status = JSON.stringify(StatusList.OrderReturnStatus);
        tx.order.reasonForReturning = tx.reasonForReturning;
        tx.order.returnOrderDate = new Date().toISOString();
        const returned = getFactory().newEvent('org.example.phoenicia', 'ReturnNotification');
        returned.order = tx.order;
        returned.seller = tx.order.seller;
        emit(returned);
        return getAssetRegistry('org.example.phoenicia.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.order);
        });
}
 /**
 * Return Order to the Vendor 
 * @param {org.example.phoenicia.ReturnOrderVendor} tx - the order to be processed
 * @transaction
 */
function ReturnOrderVendor(tx) {
    if (tx.order.status == JSON.stringify(StatusList.OrderReturnStatus)){
    tx.order.status = JSON.stringify(StatusList.ReturnOrderVendorStatus);
    tx.order.returnOrderToVendorDate = new Date().toISOString();
    
    return getAssetRegistry('org.example.phoenicia.Order')
    .then(function (assetRegistry) {
        return assetRegistry.update(tx.order);
    });
}
    else {
      throw new Error ('the buyer did not return the order');
    }

}

