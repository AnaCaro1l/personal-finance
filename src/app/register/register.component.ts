import { Component, OnInit } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    RouterModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isEditMode = false;
  originalUsername: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      date: [null, Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      income: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = history.state.user;

    if (user) {
      this.isEditMode = true;
      this.originalUsername = user.username;

      this.firstFormGroup.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        date: user.date,
      });

      this.secondFormGroup.patchValue({
        income: user.income,
        username: user.username,
        password: user.password,
      });
    }
  }

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const rawFirst = this.firstFormGroup.getRawValue();
      const rawSecond = this.secondFormGroup.getRawValue();

      const formData = {
        ...rawFirst,
        ...rawSecond,
      };

      const usersData = localStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];

      if (this.isEditMode) {
        const index = users.findIndex(
          (u: any) => u.username === this.originalUsername
        );
        if (index !== -1) {
          users[index] = formData;
          localStorage.setItem('users', JSON.stringify(users));

          localStorage.setItem('currentUser', JSON.stringify(formData));

          alert('Dados atualizados com sucesso!');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Usuário não encontrado para atualizar.');
        }
      } else {
        const exists = users.find((u: any) => u.username === formData.username);
        if (exists) {
          alert('Usuário já cadastrado.');
          return;
        }

        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
