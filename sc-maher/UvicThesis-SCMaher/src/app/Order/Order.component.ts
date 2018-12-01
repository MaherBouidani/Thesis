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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OrderService } from './Order.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  orderNumber = new FormControl('', Validators.required);
  items = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  dispute = new FormControl('', Validators.required);
  resolve = new FormControl('', Validators.required);
  backorder = new FormControl('', Validators.required);
  refund = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  created = new FormControl('', Validators.required);
  bought = new FormControl('', Validators.required);
  cancelled = new FormControl('', Validators.required);
  ordered = new FormControl('', Validators.required);
  dateBackordered = new FormControl('', Validators.required);
  requestShipment = new FormControl('', Validators.required);
  delivered = new FormControl('', Validators.required);
  delivering = new FormControl('', Validators.required);
  disputeOpened = new FormControl('', Validators.required);
  disputeResolved = new FormControl('', Validators.required);
  paymentRequested = new FormControl('', Validators.required);
  orderRefunded = new FormControl('', Validators.required);
  approved = new FormControl('', Validators.required);
  paid = new FormControl('', Validators.required);
  provider = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);
  bank = new FormControl('', Validators.required);

  constructor(public serviceOrder: OrderService, fb: FormBuilder) {
    this.myForm = fb.group({
      orderNumber: this.orderNumber,
      items: this.items,
      status: this.status,
      dispute: this.dispute,
      resolve: this.resolve,
      backorder: this.backorder,
      refund: this.refund,
      amount: this.amount,
      created: this.created,
      bought: this.bought,
      cancelled: this.cancelled,
      ordered: this.ordered,
      dateBackordered: this.dateBackordered,
      requestShipment: this.requestShipment,
      delivered: this.delivered,
      delivering: this.delivering,
      disputeOpened: this.disputeOpened,
      disputeResolved: this.disputeResolved,
      paymentRequested: this.paymentRequested,
      orderRefunded: this.orderRefunded,
      approved: this.approved,
      paid: this.paid,
      provider: this.provider,
      shipper: this.shipper,
      buyer: this.buyer,
      seller: this.seller,
      bank: this.bank
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOrder.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.phoenicia.Order',
      'orderNumber': this.orderNumber.value,
      'items': this.items.value,
      'status': this.status.value,
      'dispute': this.dispute.value,
      'resolve': this.resolve.value,
      'backorder': this.backorder.value,
      'refund': this.refund.value,
      'amount': this.amount.value,
      'created': this.created.value,
      'bought': this.bought.value,
      'cancelled': this.cancelled.value,
      'ordered': this.ordered.value,
      'dateBackordered': this.dateBackordered.value,
      'requestShipment': this.requestShipment.value,
      'delivered': this.delivered.value,
      'delivering': this.delivering.value,
      'disputeOpened': this.disputeOpened.value,
      'disputeResolved': this.disputeResolved.value,
      'paymentRequested': this.paymentRequested.value,
      'orderRefunded': this.orderRefunded.value,
      'approved': this.approved.value,
      'paid': this.paid.value,
      'provider': this.provider.value,
      'shipper': this.shipper.value,
      'buyer': this.buyer.value,
      'seller': this.seller.value,
      'bank': this.bank.value
    };

    this.myForm.setValue({
      'orderNumber': null,
      'items': null,
      'status': null,
      'dispute': null,
      'resolve': null,
      'backorder': null,
      'refund': null,
      'amount': null,
      'created': null,
      'bought': null,
      'cancelled': null,
      'ordered': null,
      'dateBackordered': null,
      'requestShipment': null,
      'delivered': null,
      'delivering': null,
      'disputeOpened': null,
      'disputeResolved': null,
      'paymentRequested': null,
      'orderRefunded': null,
      'approved': null,
      'paid': null,
      'provider': null,
      'shipper': null,
      'buyer': null,
      'seller': null,
      'bank': null
    });

    return this.serviceOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'orderNumber': null,
        'items': null,
        'status': null,
        'dispute': null,
        'resolve': null,
        'backorder': null,
        'refund': null,
        'amount': null,
        'created': null,
        'bought': null,
        'cancelled': null,
        'ordered': null,
        'dateBackordered': null,
        'requestShipment': null,
        'delivered': null,
        'delivering': null,
        'disputeOpened': null,
        'disputeResolved': null,
        'paymentRequested': null,
        'orderRefunded': null,
        'approved': null,
        'paid': null,
        'provider': null,
        'shipper': null,
        'buyer': null,
        'seller': null,
        'bank': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.phoenicia.Order',
      'items': this.items.value,
      'status': this.status.value,
      'dispute': this.dispute.value,
      'resolve': this.resolve.value,
      'backorder': this.backorder.value,
      'refund': this.refund.value,
      'amount': this.amount.value,
      'created': this.created.value,
      'bought': this.bought.value,
      'cancelled': this.cancelled.value,
      'ordered': this.ordered.value,
      'dateBackordered': this.dateBackordered.value,
      'requestShipment': this.requestShipment.value,
      'delivered': this.delivered.value,
      'delivering': this.delivering.value,
      'disputeOpened': this.disputeOpened.value,
      'disputeResolved': this.disputeResolved.value,
      'paymentRequested': this.paymentRequested.value,
      'orderRefunded': this.orderRefunded.value,
      'approved': this.approved.value,
      'paid': this.paid.value,
      'provider': this.provider.value,
      'shipper': this.shipper.value,
      'buyer': this.buyer.value,
      'seller': this.seller.value,
      'bank': this.bank.value
    };

    return this.serviceOrder.updateAsset(form.get('orderNumber').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceOrder.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceOrder.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'orderNumber': null,
        'items': null,
        'status': null,
        'dispute': null,
        'resolve': null,
        'backorder': null,
        'refund': null,
        'amount': null,
        'created': null,
        'bought': null,
        'cancelled': null,
        'ordered': null,
        'dateBackordered': null,
        'requestShipment': null,
        'delivered': null,
        'delivering': null,
        'disputeOpened': null,
        'disputeResolved': null,
        'paymentRequested': null,
        'orderRefunded': null,
        'approved': null,
        'paid': null,
        'provider': null,
        'shipper': null,
        'buyer': null,
        'seller': null,
        'bank': null
      };

      if (result.orderNumber) {
        formObject.orderNumber = result.orderNumber;
      } else {
        formObject.orderNumber = null;
      }

      if (result.items) {
        formObject.items = result.items;
      } else {
        formObject.items = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.dispute) {
        formObject.dispute = result.dispute;
      } else {
        formObject.dispute = null;
      }

      if (result.resolve) {
        formObject.resolve = result.resolve;
      } else {
        formObject.resolve = null;
      }

      if (result.backorder) {
        formObject.backorder = result.backorder;
      } else {
        formObject.backorder = null;
      }

      if (result.refund) {
        formObject.refund = result.refund;
      } else {
        formObject.refund = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.created) {
        formObject.created = result.created;
      } else {
        formObject.created = null;
      }

      if (result.bought) {
        formObject.bought = result.bought;
      } else {
        formObject.bought = null;
      }

      if (result.cancelled) {
        formObject.cancelled = result.cancelled;
      } else {
        formObject.cancelled = null;
      }

      if (result.ordered) {
        formObject.ordered = result.ordered;
      } else {
        formObject.ordered = null;
      }

      if (result.dateBackordered) {
        formObject.dateBackordered = result.dateBackordered;
      } else {
        formObject.dateBackordered = null;
      }

      if (result.requestShipment) {
        formObject.requestShipment = result.requestShipment;
      } else {
        formObject.requestShipment = null;
      }

      if (result.delivered) {
        formObject.delivered = result.delivered;
      } else {
        formObject.delivered = null;
      }

      if (result.delivering) {
        formObject.delivering = result.delivering;
      } else {
        formObject.delivering = null;
      }

      if (result.disputeOpened) {
        formObject.disputeOpened = result.disputeOpened;
      } else {
        formObject.disputeOpened = null;
      }

      if (result.disputeResolved) {
        formObject.disputeResolved = result.disputeResolved;
      } else {
        formObject.disputeResolved = null;
      }

      if (result.paymentRequested) {
        formObject.paymentRequested = result.paymentRequested;
      } else {
        formObject.paymentRequested = null;
      }

      if (result.orderRefunded) {
        formObject.orderRefunded = result.orderRefunded;
      } else {
        formObject.orderRefunded = null;
      }

      if (result.approved) {
        formObject.approved = result.approved;
      } else {
        formObject.approved = null;
      }

      if (result.paid) {
        formObject.paid = result.paid;
      } else {
        formObject.paid = null;
      }

      if (result.provider) {
        formObject.provider = result.provider;
      } else {
        formObject.provider = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.buyer) {
        formObject.buyer = result.buyer;
      } else {
        formObject.buyer = null;
      }

      if (result.seller) {
        formObject.seller = result.seller;
      } else {
        formObject.seller = null;
      }

      if (result.bank) {
        formObject.bank = result.bank;
      } else {
        formObject.bank = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'orderNumber': null,
      'items': null,
      'status': null,
      'dispute': null,
      'resolve': null,
      'backorder': null,
      'refund': null,
      'amount': null,
      'created': null,
      'bought': null,
      'cancelled': null,
      'ordered': null,
      'dateBackordered': null,
      'requestShipment': null,
      'delivered': null,
      'delivering': null,
      'disputeOpened': null,
      'disputeResolved': null,
      'paymentRequested': null,
      'orderRefunded': null,
      'approved': null,
      'paid': null,
      'provider': null,
      'shipper': null,
      'buyer': null,
      'seller': null,
      'bank': null
      });
  }

}
