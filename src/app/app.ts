import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterModule],  
 templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
 contactInfo = '';
  password = '';
  newPassword = '';
  confirmPassword = '';
  loginError = '';
  resetError = '';
  showLoginSection = true;
  showResetSection = false;
  passwordVisible: { [key: string]: boolean } = {};
  

  constructor(
    private router: Router
  ){}
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const updatedContact = '0123456789';
      const storedUsers = JSON.parse(localStorage.getItem('users') || 'null');
      if (!storedUsers || storedUsers[0].contact !== updatedContact) {
        const users = [{ contact: updatedContact, password: 'admin123' }];
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  togglePassword(field: string) {
    this.passwordVisible[field] = !this.passwordVisible[field];
  }

  getInputType(field: string): string {
    return this.passwordVisible[field] ? 'text' : 'password';
  }

  getEyeIcon(field: string): string {
    return this.passwordVisible[field] ? '🙈' : '👁️';
  }

  handleLogin() {
    this.loginError = '';
    if (!this.contactInfo || !this.password) {
      this.loginError = 'All fields are required!';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find((u: any) => u.contact === this.contactInfo && u.password === this.password);

   if (matchedUser) {
    this.showLoginSection = false;
    this.router.navigate(['/app-roomin']); // ✅ triggers routing
  } else {
    this.loginError = 'Invalid credentials!';
  }
}

  handleForgotPassword() {
    this.loginError = '';
    if (!this.contactInfo) {
      this.loginError = 'Please enter your phone number or email.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find((u: any) => u.contact === this.contactInfo);

    if (!matchedUser) {
      this.loginError = 'User not found!';
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('resetOTP', otp.toString());
    localStorage.setItem('resetUser', this.contactInfo);
    alert(`OTP sent to ${this.contactInfo}: ${otp}`);

    const userOtp = prompt('Enter the OTP you received:');
    if (userOtp === otp.toString()) {
      this.showLoginSection = false;
      this.showResetSection = true;
    } else {
      alert('Incorrect OTP.');
    }
  }

  resetPassword() {
    this.resetError = '';
    if (!this.newPassword || !this.confirmPassword) {
      this.resetError = 'Both fields are required!';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.resetError = 'Passwords do not match!';
      return;
    }

    const contact = localStorage.getItem('resetUser');
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    users = users.map((u: any) =>
      u.contact === contact ? { ...u, password: this.newPassword } : u
    );

    localStorage.setItem('users', JSON.stringify(users));
    alert('Password has been reset successfully!');
    this.showResetSection = false;
    this.showLoginSection = true;
  }

  handleLogout() {
    document.getElementById('appSection')!.style.display = 'none';
    this.showLoginSection = true;
    this.loginError = '';
    this.contactInfo = '';
    this.password = '';
  }
}