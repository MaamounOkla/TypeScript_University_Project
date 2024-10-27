import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RamschemaComponent } from './pages/ramschema/ramschema.component';
import { EducationComponent } from './pages/education/education.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'home', component: HomeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'ramschema', component: RamschemaComponent },
  { path: '**', component: NotFoundComponent } 
];