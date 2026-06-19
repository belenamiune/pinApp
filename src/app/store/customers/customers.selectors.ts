import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomersState } from './customers.reducer';

export const selectCustomersState =
  createFeatureSelector<CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  state => state.customers
);

export const selectCustomersLoading = createSelector(
  selectCustomersState,
  state => state.loading
);

export const selectCustomersSaving = createSelector(
  selectCustomersState,
  state => state.saving
);

export const selectCustomersError = createSelector(
  selectCustomersState,
  state => state.error
);

export const selectCustomersSuccess = createSelector(
  selectCustomersState,
  state => state.successMessage
);


export const selectCustomerStats = createSelector(
  selectAllCustomers,
  customers => {
    if (!customers.length) return { averageAge: 0, stdDeviation: 0 };

    const ages = customers.map(c => c.edad);
    const avg = ages.reduce((a, b) => a + b, 0) / ages.length;
    const std = Math.sqrt(
      ages.map(a => Math.pow(a - avg, 2)).reduce((a, b) => a + b, 0) / ages.length
    );
    return { averageAge: avg, stdDeviation: std };
  }
);