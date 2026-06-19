import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import * as AuthActions from '@store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '@store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoading$ = this.store.select(selectAuthLoading);

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.listenForErrors();
  }

  private initForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private listenForErrors(): void {
    this.store.select(selectAuthError).pipe(
      takeUntil(this.destroy$),
      filter(error => !!error)
    ).subscribe(error => {
      this.snackBar.open(
        this.getErrorMessage(error!),
        'Cerrar',
        { duration: 4000 }
      );
    });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  getLoginControl(name: string) {
    return this.loginForm.get(name);
  }

  getRegisterControl(name: string) {
    return this.registerForm.get(name);
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.registerForm.value;
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  private getErrorMessage(code: string): string {
    const errors: { [key: string]: string } = {
      'auth/user-not-found': 'No existe una cuenta con ese email',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Ese email ya está registrado',
      'auth/invalid-email': 'El email no es válido',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres'
    };
    return errors[code] || 'Ocurrió un error, intentá de nuevo';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}