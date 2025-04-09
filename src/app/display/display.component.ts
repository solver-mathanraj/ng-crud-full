import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-display',
  imports: [CommonModule, RouterLink],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService) {}
  ngOnInit(): void {
    this.getData();
  }
  datas: any = [];
  async getData() {
    try {
      const res: any = await this.apiService.getRecord();
      console.log(res);
      this.datas = res.users;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteData(id:string) {
    try {
      const res: any = await this.apiService.deleteRecord(id);
      this.ngOnInit()
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
}
