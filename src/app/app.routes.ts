import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RamschemaComponent } from './pages/ramschema/ramschema.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'ramschema', component: RamschemaComponent },
  { path: '**', component: NotFoundComponent } 
];