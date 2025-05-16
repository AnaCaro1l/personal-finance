import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-bill-form',
  imports: [
    LucideAngularModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule
  ],
  templateUrl: './bill-form.component.html',
  styleUrl: './bill-form.component.scss'
})
export class BillFormComponent {
  readonly X = X;

  billForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BillFormComponent>,
  ) {
    this.billForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: [null, Validators.required],
      status: ['Unpaid', Validators.required],
    })
  }

  onSave(){
    if (this.billForm.valid){
      this.dialogRef.close(this.billForm.value)
    }
  }

  onCancel(){
    this.dialogRef.close()
  }
}
