import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

// Pipes
import { CustomDatePipe } from './pipes/custom-date.pipe';

// Components
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTabsModule,
];

const SHARED_DECLARATIONS = [
  CustomDatePipe,
  ConfirmDialogComponent,
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ...MATERIAL_MODULES,

    ...SHARED_DECLARATIONS,
  ]
})
export class SharedModule {}