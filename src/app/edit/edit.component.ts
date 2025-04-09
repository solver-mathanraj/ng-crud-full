import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  myForm!: FormGroup;
  recordId!: string;
  record: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recordId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getRecord(this.recordId);
  }
  async onSubmit() {
    if (this.myForm.valid) {
      try {
        console.log(this.myForm.value);
        const res = await this.apiService.updateRecord(
          this.recordId,
          this.myForm.value
        );
        console.log('--Response : ', res);
        this.myForm.reset();
        this.router.navigateByUrl('');
      } catch (e) {
        console.log(e);
      }
    } else {
      this.myForm.markAllAsTouched();
      console.log('something error da mathanu');
    }
  }
  async getRecord(id: string) {
    try {
      const res: any = await this.apiService.getDataByid(id);
      this.record = res;
      this.myForm.patchValue({
        username: res.username,
        name: res.name,
        number: res.number,
        email: res.email,
      });
    } catch (error) {
      console.log(error)
    }
  }
}
