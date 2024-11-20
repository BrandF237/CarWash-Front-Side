import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import {UserAuthService} from "../../../services/user-auth.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, FormsModule]
})
export class RegisterComponent {
  email: string | undefined;
  name : string | undefined;
  password : string | undefined;
  roles: string | undefined;
  user: any[] = [];

  constructor(private authService: UserAuthService, private router: Router) { }

  // Method to handle user registration

  registerUser() {
    const newUser = { name: this.name, password: this.password, roles: this.roles, email: this.email };
    console.log(newUser);
    this.authService.addNewUser(newUser).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        this.router.navigate(['/login']);
        // alert('User registered successfully!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed!');
      }
    });
  }

  clearForm() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.roles = 'USER';
  }
}
