import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component'; // adjust path
import { HomeComponent } from '../home/home.component'; // adjust path
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-display',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  datas: any = [];
  loading: boolean = true;
  async getData() {
    try {
      this.loading = true;
      const res: any = await this.apiService.getRecord();
      console.log(res);
      this.datas = res;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async deleteData(id: string) {
    try {
      const res: any = await this.apiService.deleteRecord(id);
      this.ngOnInit();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // handle refresh or success toast
        this.ngOnInit();
      }
    });
  }
  openInsertDialog() {
    const dialogRef = this.dialog.open(HomeComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // handle refresh or success toast
        this.ngOnInit();
      }
    });
  }
}
