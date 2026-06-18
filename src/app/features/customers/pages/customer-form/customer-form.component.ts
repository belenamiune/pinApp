import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
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


  getControl(name: string) {
    return this.customerForm.get(name);
  }


  async onSubmit(): Promise<void> {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      await this.customerService.createCustomer(this.customerForm.value);
      this.snackBar.open('Cliente registrado exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-success']
      });
      this.router.navigate(['/customers']);
    } catch (error) {
      this.snackBar.open('Error al registrar el cliente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-error']
      });
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}