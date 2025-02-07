import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ResponsibilitiesComponent } from './pages/responsibilities/responsibilities.component';
import { LinksComponent } from './pages/links/links.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Home Page
  { path: 'about', component: AboutComponent },  // About Page
  { path: 'responsibilities', component: ResponsibilitiesComponent },  // Office Responsibilities
  { path: 'links', component: LinksComponent },  // Links Page
  { path: 'contact', component: ContactComponent },  // Contact Us Page
];
