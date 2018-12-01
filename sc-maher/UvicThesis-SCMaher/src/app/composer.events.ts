import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace composer.events{
   export abstract class BasicEvent extends Event {
   }
   export class requested extends BasicEvent {
      orderNumber: string;
   }
   export class ordered extends BasicEvent {
      orderNumber: string;
   }
   export class backordered extends BasicEvent {
      orderNumber: string;
   }
   export class ship extends BasicEvent {
      orderNumber: string;
   }
   export class delivered extends BasicEvent {
      orderNumber: string;
   }
   export class dispute extends BasicEvent {
      orderNumber: string;
   }
   export class resolved extends BasicEvent {
      orderNumber: string;
   }
   export class requestPayment extends BasicEvent {
      orderNumber: string;
   }
   export class Paid extends BasicEvent {
      orderNumber: string;
   }
// }
