import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('resetUser'); // optional cleanup
    // Redirect to login
    this.router.navigate(['/']);
  }
}
  