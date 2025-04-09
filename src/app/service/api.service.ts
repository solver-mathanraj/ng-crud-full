import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://ng-crud-api.onrender.com';

  postRecord(newData: any) {
    const currentUrl = `${this.baseUrl}/users`;
    return firstValueFrom(this.http.post(currentUrl, newData));
  }
  getRecord() {
    const currentUrl = `${this.baseUrl}/users`;
    return firstValueFrom(this.http.get(currentUrl));
  }
  deleteRecord(id: string) {
    const currentUrl = `${this.baseUrl}/users/${id}`;
    return firstValueFrom(this.http.delete(currentUrl));
  }
  // edit
  getDataByid(id: string) {
    const currentUrl = `${this.baseUrl}/users/${id}`;
    return firstValueFrom(this.http.get(currentUrl));
  }
  updateRecord(id: string, data: any) {
    const currentUrl = `${this.baseUrl}/users/${id}`;
    return firstValueFrom(this.http.patch(currentUrl, data));
  }
}
