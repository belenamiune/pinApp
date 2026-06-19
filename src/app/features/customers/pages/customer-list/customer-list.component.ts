import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from '@models/customer.model';
import * as CustomerActions from '@store/customers/customers.actions';
import {
  selectAllCustomers,
  selectCustomersLoading,
  selectCustomerStats
} from '@store/customers/customers.selectors';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers$: Observable<Customer[]> = this.store.select(selectAllCustomers);
  loading$:Observable<boolean> = this.store.select(selectCustomersLoading);
  stats$ = this.store.select(selectCustomerStats);

  searchTerm = '';
  sortField: keyof Customer = 'apellido';
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredCustomers: Customer[] = [];

  private allCustomers: Customer[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());

    this.customers$.pipe(takeUntil(this.destroy$)).subscribe(customers => {
      this.allCustomers = customers;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.allCustomers];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c =>
        c.nombre.toLowerCase().includes(term) ||
        c.apellido.toLowerCase().includes(term) ||
        c.edad.toString().includes(term)
      );
    }

    result.sort((a, b) => {
      const valA = a[this.sortField];
      const valB = b[this.sortField];
      if (valA == null || valB == null) return 0;
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ?  1 : -1;
      return 0;
    });

    this.filteredCustomers = result;
  }

  sortBy(field: keyof Customer): void {
    this.sortDirection = this.sortField === field
      ? (this.sortDirection === 'asc' ? 'desc' : 'asc')
      : 'asc';
    this.sortField = field;
    this.applyFilters();
  }

  deleteCustomer(customer: Customer): void {
    const data: ConfirmDialogData = {
      title: '¿Eliminar cliente?',
      message: `Estás por eliminar a ${customer.nombre} ${customer.apellido}. Esta acción no se puede deshacer.`,
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(CustomerActions.deleteCustomer({ id: customer.id! }));
        }
      });
  }

  goToForm(): void {
    this.router.navigate(['/customers/new']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}