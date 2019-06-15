import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: Routes = [ { path: 'add-project', component: AddProjectComponent },
  { path: 'add-user',  component: AddUserComponent },
  { path: 'list-user',  component: ListUserComponent },
  { path: 'edit-user',  component: EditUserComponent },
  { path: 'edit-project',  component: EditProjectComponent },
  { path: 'add-task',  component: AddTaskComponent },
  { path: 'view-task',  component: ViewTaskComponent },
  { path: 'edit-task',  component: EditTaskComponent },
  { path: '', component: AddProjectComponent, pathMatch: 'full'} // redirect to home page on load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
