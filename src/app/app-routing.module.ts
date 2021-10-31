import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule} from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const routes:Routes =[
  {path:'employeeslist', component:EmployeesListComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { } 
export const routingComponents = [EmployeesListComponent];