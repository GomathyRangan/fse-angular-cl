import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProjectService } from '../services/project.service';
import { ModalService } from '../services/modal.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
    startDate: Date;
    endDate: Date;
    addProjectForm: FormGroup;
    closeResult: string;
    projects: Project[];

    constructor(private formBuilder: FormBuilder, private router: Router,  private projectService: ProjectService, private modalService: NgbModal) {
        this.startDate = new Date();
        this.endDate = new Date();
        this.startDate.setDate(this.startDate.getDate());
        this.endDate.setDate(this.startDate.getDate() + 1);
    }
    ngOnInit() {
        this.projectService.getAllProjects()
            .subscribe(data => {
                this.projects = data;
                console.log("List-Project :: ", JSON.stringify(data));
            });
        this.addProjectForm = this.formBuilder.group({
            id: [],
            projectName: ['', Validators.required],
            priority: ['', Validators.required],
            startDate: [],
            endDate: [],
            manager: ['', Validators.required]
        });


    }
    onSubmit() {
         console.log("Add-project Before Project: ", this.addProjectForm.value);
        this.projectService.createProject(this.addProjectForm.value)
            .subscribe(data => {
                console.log("Add-project After Project: ", JSON.stringify(data));
                this.router.navigate(['add-project']);
            });
    }
    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'add-project.component-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
