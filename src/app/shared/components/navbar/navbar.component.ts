import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleTheme } from '@store/theme/theme.actions';
import { logout } from '@store/auth/auth.actions';
import { selectIsDark } from '@store/theme/theme.selectors';
import { selectIsLoggedIn } from '@store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDark$:     Observable<boolean> = this.store.select(selectIsDark);
  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {}

  onToggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}