import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";

import {BasketRoutingModule} from './basket-routing.module';

import {BasketComponent} from './components/basket/basket.component';
import {BasketElementComponent} from "./components/basket-element/basket-element.component";
import {BasketSummaryComponent} from './components/basket-summary/basket-summary.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketElementComponent,
    BasketSummaryComponent
  ],
  imports: [
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule {
}
