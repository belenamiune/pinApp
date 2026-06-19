import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as CustomerActions from '@store/customers/customers.actions';
import {
  selectCustomersSaving,
  selectCustomersError,
  selectCustomersSuccess
} from '@store/customers/customers.selectors';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {

  customerForm!: FormGroup;
  isLoading$ = this.store.select(selectCustomersSaving);

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listenForFeedback();
  }

  private initForm(): void {
    this.customerForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      edad: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
        Validators.pattern(/^\d+$/)
      ]],
      fechaNacimiento: ['', Validators.required]
    });
  }

  private listenForFeedback(): void {
    this.store.select(selectCustomersSuccess).pipe(
      takeUntil(this.destroy$),
      filter(msg => !!msg)
    ).subscribe(msg => {
      this.snackBar.open(msg!, 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-success']
      });
    });

    this.store.select(selectCustomersError).pipe(
      takeUntil(this.destroy$),
      filter(err => !!err)
    ).subscribe(() => {
      this.snackBar.open('Error al registrar el cliente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  getControl(name: string) {
    return this.customerForm.get(name);
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(CustomerActions.createCustomer({
      customer: this.customerForm.value
    }));
  }

  onCancel(): void {
    history.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}