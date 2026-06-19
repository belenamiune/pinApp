import { createReducer, on } from '@ngrx/store';
import { Customer } from '@models/customer.model';
import * as CustomerActions from '@store/customers/customers.actions';

export interface CustomersState {
  customers: Customer[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialState: CustomersState = {
  customers: [],
  loading: false,
  saving: false,
  error: null,
  successMessage: null
};

export const customersReducer = createReducer(
  initialState,

  // Load
  on(CustomerActions.loadCustomers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Create
  on(CustomerActions.createCustomer, state => ({
    ...state,
    saving: true,
    error: null,
    successMessage: null
  })),
  on(CustomerActions.createCustomerSuccess, state => ({
    ...state,
    saving: false,
    successMessage: 'Cliente registrado exitosamente'
  })),
  on(CustomerActions.createCustomerFailure, (state, { error }) => ({
    ...state,
    saving: false,
    error
  })),

  // Delete
  on(CustomerActions.deleteCustomer, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(c => c.id !== id)
  })),
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    error
  }))
);