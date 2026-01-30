import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jochem } from './pages/jochem/jochem';
import {Gallery} from './pages/gallery/gallery';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'jochem', component: Jochem },
  { path: 'gallery', component: Gallery },
  { path: '**', redirectTo: '' }
];
