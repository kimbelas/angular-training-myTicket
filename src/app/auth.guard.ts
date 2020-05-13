import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {

  }

  canActivate(): boolean {
    if(this._authService.loggedIn) {
      this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
