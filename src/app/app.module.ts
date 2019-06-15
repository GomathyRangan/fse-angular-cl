import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { ModalService } from './services/modal.service';

import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';
import { AddProjectComponent } from './add-project/add-project.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';




@NgModule({
    declarations: [
        AppComponent,

        
        
        EditUserComponent,
        ListUserComponent,
        AddUserComponent,
        AddProjectComponent,
        AddTaskComponent,
        ListProjectComponent,
        ViewTaskComponent,
        EditTaskComponent,
        EditProjectComponent        

    ],
    imports: [
        BrowserModule,
        
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        NgbModule.forRoot()
    ],
    providers: [UserService, ModalService, ProjectService,TaskService], 
    exports: [],
    bootstrap: [AppComponent],
    entryComponents:[]
})
export class AppModule { }
