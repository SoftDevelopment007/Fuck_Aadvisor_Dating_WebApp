import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(public auth: AuthService) {}

  canActivate(): boolean {
    return this.auth.isAdminAuthenticated();
  }
}
