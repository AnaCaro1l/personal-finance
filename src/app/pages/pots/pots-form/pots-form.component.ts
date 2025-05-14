import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-pots-form',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './pots-form.component.html',
  styleUrl: './pots-form.component.scss'
})
export class PotsFormComponent {
  readonly X = X;
  potForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PotsFormComponent>) {
    this.potForm = this.fb.group({
      name: ['', Validators.required],
      await: [0, Validators.required],
      catogory: ['', Validators.required],
    });
  }

  onSave(){
    if (this.potForm.valid){
      this.dialogRef.close(this.potForm.value)
    }
  }

  onCancel(){
    this.dialogRef.close()
  }
}
