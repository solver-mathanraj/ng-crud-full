import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.getRecord(this.data.id);
  }

  async getRecord(id: string) {
    try {
      const res: any = await this.apiService.getDataByid(id);
      this.myForm.patchValue(res);
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmit() {
    if (this.myForm.valid) {
      try {
        await this.apiService.updateRecord(this.data.id, this.myForm.value);
        this.dialogRef.close(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }
}
