import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersModule } from './modules/users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
