import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.phoenicia{
   export class Buyer extends Member {
      buyerID: string;
   }
   export class Seller extends Member {
      sellerID: string;
   }
   export class Shipper extends Member {
      shipperID: string;
   }
   export class Provider extends Member {
      providerID: string;
   }
   export class Bank extends Member {
      bankID: string;
   }
   export class Order extends Asset {
      orderNumber: string;
      items: string[];
      status: string;
      dispute: string;
      resolve: string;
      backorder: string;
      refund: string;
      amount: number;
      created: string;
      bought: string;
      cancelled: string;
      ordered: string;
      dateBackordered: string;
      requestShipment: string;
      delivered: string;
      delivering: string;
      disputeOpened: string;
      disputeResolved: string;
      paymentRequested: string;
      orderRefunded: string;
      approved: string;
      paid: string;
      provider: Provider;
      shipper: Shipper;
      buyer: Buyer;
      seller: Seller;
      bank: Bank;
   }
   export class CreateOrder extends Transaction {
      amount: number;
      order: Order;
      buyer: Buyer;
      seller: Seller;
      bank: Bank;
   }
   export class OrderCancel extends Transaction {
      order: Order;
      buyer: Buyer;
      seller: Seller;
   }
   export class Buy extends Transaction {
      order: Order;
      buyer: Buyer;
      seller: Seller;
   }
   export class OrderFromSupplier extends Transaction {
      order: Order;
      provider: Provider;
      seller: Seller;
   }
   export class RequestShipping extends Transaction {
      order: Order;
      shipper: Shipper;
      provider: Provider;
   }
   export class Deliver extends Transaction {
      order: Order;
      shipper: Shipper;
   }
   export class Delivering extends Transaction {
      deliveryStatus: string;
      order: Order;
      shipper: Shipper;
   }
   export class BackOrder extends Transaction {
      backorder: string;
      order: Order;
      provider: Provider;
   }
   export class Dispute extends Transaction {
      dispute: string;
      order: Order;
      buyer: Buyer;
      seller: Seller;
      bank: Bank;
   }
   export class Resolve extends Transaction {
      resolve: string;
      order: Order;
      buyer: Buyer;
      seller: Seller;
      shipper: Shipper;
      provider: Provider;
      bank: Bank;
   }
   export class RequestPayment extends Transaction {
      order: Order;
      seller: Seller;
      bank: Bank;
   }
   export class AuthorizePayment extends Transaction {
      order: Order;
      buyer: Buyer;
      bank: Bank;
   }
   export class Pay extends Transaction {
      order: Order;
      seller: Seller;
      bank: Bank;
   }
   export class Refund extends Transaction {
      refund: string;
      order: Order;
      seller: Seller;
      bank: Bank;
   }
// }
