import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  standalone: true,
 imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'my-room-app';

 contactInfo = '';
  password = '';
  errorMessage = '';

  users = [{ contact: '0123456789', password: 'admin123' }];

  handleLogin() {
    const user = this.users.find(
      u => u.contact === this.contactInfo && u.password === this.password
    );

    if (user) {
      this.errorMessage = '';
      alert('Login successful!');
      // Navigate or show app section
    } else {
      this.errorMessage = 'Invalid credentials!';
    }
  }
}


