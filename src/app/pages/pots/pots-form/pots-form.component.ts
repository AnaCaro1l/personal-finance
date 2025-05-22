import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Pots } from '../../../services/pots-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pots-form',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './pots-form.component.html',
  styleUrl: './pots-form.component.scss',
})
export class PotsFormComponent {
  readonly X = X;

  potForm: FormGroup;

  isEditMode = false;
  dialogTitle = 'New Pot';

  categoryColorMap: Record<string, string> = {
    entertainment: 'border-l-teal-500',
    bills: 'border-l-orange-400',
    diningOut: 'border-l-purple-400',
    personalCare: 'border-l-pink-400',
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PotsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pots | null
  ) {
    this.potForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
    });

    if (data) {
      this.isEditMode = true;
      this.dialogTitle = 'Edit Pot';
      this.potForm.patchValue(data);
    }
  }

  onSave() {
    if (this.potForm.valid) {
      const { name, amount, category } = this.potForm.value;
      const color = this.categoryColorMap[category] || 'border-l-teal-500';

      this.dialogRef.close({
        name,
        amount,
        color,
        category,
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
