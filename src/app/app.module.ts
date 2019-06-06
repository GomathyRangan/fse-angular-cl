import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { ModalService } from './services/modal.service';

import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';
import { AddProjectComponent } from './add-project/add-project.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListProjectComponent } from './list-project/list-project.component';



@NgModule({
    declarations: [
        AppComponent,

        
        ViewtaskComponent,
        EditUserComponent,
        ListUserComponent,
        AddUserComponent,
        AddProjectComponent,
        AddTaskComponent,
        ListProjectComponent
        

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
    providers: [UserService, ModalService, ProjectService], 
    exports: [],
    bootstrap: [AppComponent],
    entryComponents:[]
})
export class AppModule { }
