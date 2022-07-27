import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', redirectTo:'/auth',pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
