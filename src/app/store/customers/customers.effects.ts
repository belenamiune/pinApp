import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from '@services/customer.service';
import * as CustomerActions from './customers.actions';

@Injectable()
export class CustomersEffects {

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      switchMap(() =>
        this.customerService.getCustomers().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error =>
            of(CustomerActions.loadCustomersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomer),
      exhaustMap(({ customer }) =>
        from(this.customerService.createCustomer(customer)).pipe(
          map(() => CustomerActions.createCustomerSuccess()),
          catchError(error =>
            of(CustomerActions.createCustomerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createCustomerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomerSuccess),
      tap(() => this.router.navigate(['/customers']))
    ),
    { dispatch: false }
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      exhaustMap(({ id }) =>
        from(this.customerService.deleteCustomer(id)).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id })),
          catchError(error =>
            of(CustomerActions.deleteCustomerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private router: Router
  ) {}
}