import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,JsonPipe,MatSlideToggleModule,MatPaginatorModule,FormsModule
  ]
})
export class DashboardModule { }
