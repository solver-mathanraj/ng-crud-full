import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  async onSubmit() {
    if (this.myForm.valid) {
      try {
        console.log(this.myForm.value);
        const res = await this.apiService.postRecord(this.myForm.value);
        console.log('--Response : ', res);
        alert("Successfully inserted")
        this.myForm.reset();
      } catch (e) {
        console.log(e);
      }
    } else {
      this.myForm.markAllAsTouched();
      console.log('something error da mathanu');
    }
  }
}
