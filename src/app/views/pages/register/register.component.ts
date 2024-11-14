import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import {UserAuthService} from "../../../services/user-auth.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, FormsModule]
})
export class RegisterComponent {
  name : string = "";
  password : string = "";
  role: string = "USER";
  user: any[] = [];

  constructor(private authService: UserAuthService) {}

  // Method to handle user registration

  registerUser() {
    const newUser = { username: this.name, password: this.password, role: this.role };
    this.authService.addNewUser(newUser).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        alert('User registered successfully!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed!');
      }
    });
  }

  clearForm() {
    this.name = '';
    this.password = '';
    this.role = 'USER';
  }
}
