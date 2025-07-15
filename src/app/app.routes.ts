// app.routes.ts (or in app.config.ts if you're using standalone with Vite)
import { Routes } from '@angular/router';
import { App } from './app';
import { Roomin } from './roomin/roomin/roomin';

export const routes: Routes = [
//  { path: 'app-root', component: App },                         // show App at root
{ path: '', component: App },
  { path: 'app-roomin', component: Roomin },            // show Roomin on /app-roomin
  { path: '**', redirectTo: 'app-roomin' }                        // wildcard fallback
  
];
