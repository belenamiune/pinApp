import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  isLoading = true;

  // Filtros y ordenamiento
  searchTerm = '';
  sortField: keyof Customer = 'apellido';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Análisis de datos
  averageAge = 0;
  stdDeviation = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customerService.getCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (customers) => {
          this.customers = customers;
          this.applyFilters();
          this.calculateStats();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error cargando clientes:', err);
          this.isLoading = false;
        }
      });
  }


  applyFilters(): void {
    let result = [...this.customers];

    // Filtro por texto
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c =>
        c.nombre.toLowerCase().includes(term) ||
        c.apellido.toLowerCase().includes(term) ||
        c.edad.toString().includes(term)
      );
    }

    // Ordenamiento
    result.sort((a, b) => {
      const valA = a[this.sortField];
      const valB = b[this.sortField];

      if (valA == null || valB == null) return 0;
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredCustomers = result;
  }

  /**
   * Cambia el campo de ordenamiento. Si es el mismo campo, invierte la dirección.
   */
  sortBy(field: keyof Customer): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  /**
   * Calcula el promedio y desviación de las edades.
   */
  private calculateStats(): void {
    if (this.customers.length === 0) {
      this.averageAge = 0;
      this.stdDeviation = 0;
      return;
    }

    const ages = this.customers.map(c => c.edad);

    // Promedio
    const sum = ages.reduce((acc, age) => acc + age, 0);
    this.averageAge = sum / ages.length;

    // Desviación
    const squaredDiffs = ages.map(age => Math.pow(age - this.averageAge, 2));
    const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / ages.length;
    this.stdDeviation = Math.sqrt(avgSquaredDiff);
  }

  async deleteCustomer(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que querés eliminar este cliente?')) {
      await this.customerService.deleteCustomer(id);
    }
  }

  goToForm(): void {
    this.router.navigate(['/customers/new']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}