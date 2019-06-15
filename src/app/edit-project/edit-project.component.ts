import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

import { first } from 'rxjs/operators';
import { Project } from '../model/project.model';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

    startDate: Date;
    endDate: Date;
    editProjectForm: FormGroup;
    closeResult: string;
    projects: Project[];
    projectName: string;
      

    constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService) { }    
    
    ngOnInit() {
        let projectId = localStorage.getItem('editProjectId');
        console.log("edit project Id :::: " + projectId)
        if (!projectId) {
            alert('Invalid action.')
            this.router.navigate(['list-project']);
            return;
        }

        this.projectService.getProjectById(+projectId)
            .subscribe(data => {
                this.editProjectForm.setValue(data);
            });
        this.editProjectForm = this.formBuilder.group({
            id: [],
            projectName: ['', Validators.required],
            priority: ['', Validators.required],
            startDate: [],
            endDate: [],
            manager: ['', Validators.required]
        });


    }

    get formControls() {
        return this.editProjectForm
            .controls;
    }

    error: any = { isError: false, errorMessage: '' };

    compareTwoDates() {
        if (new Date(this.editProjectForm.controls['endDate'].value) < new Date(this.editProjectForm.controls['startDate'].value)) {
            this.error = {
                isError: true, errorMessage: 'End Date shoule be greater than start date.'
            };
        }
    }


    onSubmit() {
        console.log("update-project Before Project: ", this.editProjectForm.value);
        
        if (this.editProjectForm.controls['projectName'].value === '') {
            this.error = {
                isError: true, errorMessage: 'Project Name is required.'
            };
            return;
        } else if (this.editProjectForm.controls['startDate'].value === '' || this.editProjectForm.controls['endDate'].value === '') {

            this.error = {
                isError: true, errorMessage: 'Enter value for both Start Date and end Date'
            };
            return;
        } else {
            this.error = {
                isError: false, errorMessage: ''
            };
            this.projectService.updateProject(this.editProjectForm.value)
                 .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['add-project']);
                },
                error => {
                    alert(error);
                });

        }

    }

}
