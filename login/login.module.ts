import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginRoutes } from './login.routing';
import { LoginComponent } from './components/login.component';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }
