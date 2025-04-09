import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: 'insert',
    component: HomeComponent,
  },
  {
    path: '',
    component: DisplayComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];
