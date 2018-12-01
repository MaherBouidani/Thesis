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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    BuyerComponent,
    SellerComponent,
    ShipperComponent,
    ProviderComponent,
    BankComponent,
    CreateOrderComponent,
    OrderCancelComponent,
    BuyComponent,
    OrderFromSupplierComponent,
    RequestShippingComponent,
    DeliverComponent,
    DeliveringComponent,
    BackOrderComponent,
    DisputeComponent,
    ResolveComponent,
    RequestPaymentComponent,
    AuthorizePaymentComponent,
    PayComponent,
    RefundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
