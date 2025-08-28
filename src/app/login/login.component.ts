import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff, User } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterLink,
    LucideAngularModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm: FormGroup;
  viewPassword = false;

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly user = User;

  private snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
    } else {
      this.openSnackbar('Usuário ou senha incorretos', 'Fechar');
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário ou senha incorretos',
        life: 3000
      });
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }
}
