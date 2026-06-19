import { createAction, props } from '@ngrx/store';
import { Customer } from '@models/customer.model';

export const loadCustomers = createAction('[Customers] Load');

export const loadCustomersSuccess = createAction(
  '[Customers] Load Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers] Load Failure',
  props<{ error: string }>()
);

export const createCustomer = createAction(
  '[Customers] Create',
  props<{ customer: Customer }>()
);

export const createCustomerSuccess = createAction('[Customers] Create Success');

export const createCustomerFailure = createAction(
  '[Customers] Create Failure',
  props<{ error: string }>()
);

export const deleteCustomer = createAction(
  '[Customers] Delete',
  props<{ id: string }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customers] Delete Success',
  props<{ id: string }>()
);

export const deleteCustomerFailure = createAction(
  '[Customers] Delete Failure',
  props<{ error: string }>()
);