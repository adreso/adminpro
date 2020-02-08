import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService
} from './service.index';


@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
