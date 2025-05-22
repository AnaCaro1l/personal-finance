import { Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../../services/transactions-service.service';

@Component({
  selector: 'app-transactions-form',
  imports: [
    LucideAngularModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
],
  templateUrl: './transactions-form.component.html',
  styleUrl: './transactions-form.component.scss',
})
export class TransactionsFormComponent {
  readonly X = X;

  isEditMode = false;
  dialogTitle = 'New Transaction';

  transForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction | null
  ) {
    this.transForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      date: [null, Validators.required],
      toggle: ['Received', Validators.required],
    });

    if (data) {
      this.isEditMode = true;
      this.dialogTitle = 'Edit Transaction';
      this.transForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  onSave() {
    if (this.transForm.valid) {
      this.dialogRef.close(this.transForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
