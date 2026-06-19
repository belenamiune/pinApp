import { NgModule } from '@angular/core';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
  ]
})
export class CustomersModule {}