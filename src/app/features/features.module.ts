import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AuthModule,
    HomeModule
  ]
})
export class FeaturesModule { }
