import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from "./custom-reuse-strategy";

import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { SaveComponent } from './save/save.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'save',
    component: SaveComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)    
  ],
  declarations: [HomeComponent, TestComponent, SaveComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
