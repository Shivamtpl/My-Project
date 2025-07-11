import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { Roomin } from './roomin/roomin/roomin';



const routes: Routes = [

  { path: 'roomin', component: Roomin },
]

@Injectable({
  providedIn: 'root'
})
export class AppRoutingModule {

  constructor() { }
}
