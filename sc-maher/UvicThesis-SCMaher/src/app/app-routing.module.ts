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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { OrderComponent } from './Order/Order.component';

import { BuyerComponent } from './Buyer/Buyer.component';
import { SellerComponent } from './Seller/Seller.component';
import { ShipperComponent } from './Shipper/Shipper.component';
import { ProviderComponent } from './Provider/Provider.component';
import { BankComponent } from './Bank/Bank.component';

import { CreateOrderComponent } from './CreateOrder/CreateOrder.component';
import { OrderCancelComponent } from './OrderCancel/OrderCancel.component';
import { BuyComponent } from './Buy/Buy.component';
import { OrderFromSupplierComponent } from './OrderFromSupplier/OrderFromSupplier.component';
import { RequestShippingComponent } from './RequestShipping/RequestShipping.component';
import { DeliverComponent } from './Deliver/Deliver.component';
import { DeliveringComponent } from './Delivering/Delivering.component';
import { BackOrderComponent } from './BackOrder/BackOrder.component';
import { DisputeComponent } from './Dispute/Dispute.component';
import { ResolveComponent } from './Resolve/Resolve.component';
import { RequestPaymentComponent } from './RequestPayment/RequestPayment.component';
import { AuthorizePaymentComponent } from './AuthorizePayment/AuthorizePayment.component';
import { PayComponent } from './Pay/Pay.component';
import { RefundComponent } from './Refund/Refund.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'Buyer', component: BuyerComponent },
  { path: 'Seller', component: SellerComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Provider', component: ProviderComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'CreateOrder', component: CreateOrderComponent },
  { path: 'OrderCancel', component: OrderCancelComponent },
  { path: 'Buy', component: BuyComponent },
  { path: 'OrderFromSupplier', component: OrderFromSupplierComponent },
  { path: 'RequestShipping', component: RequestShippingComponent },
  { path: 'Deliver', component: DeliverComponent },
  { path: 'Delivering', component: DeliveringComponent },
  { path: 'BackOrder', component: BackOrderComponent },
  { path: 'Dispute', component: DisputeComponent },
  { path: 'Resolve', component: ResolveComponent },
  { path: 'RequestPayment', component: RequestPaymentComponent },
  { path: 'AuthorizePayment', component: AuthorizePaymentComponent },
  { path: 'Pay', component: PayComponent },
  { path: 'Refund', component: RefundComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
