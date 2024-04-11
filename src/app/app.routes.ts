import { Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { FilesComponent } from './files/files.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'collections',
    component: CollectionComponent,
  },
  { path: 'collection/:id', component: CollectionDetailComponent },
  { path: 'files', component: FilesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
