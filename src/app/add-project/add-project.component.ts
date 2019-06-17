import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../services/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Project } from '../model/project.model';
import { DatePipe } from '@angular/common';
import { DateFormatterPipe } from '../pipe/date-formatter.pipe';

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
	project: Project;
	projectName: string;

	constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService, private modalService: NgbModal) {
		this.startDate = new Date();
		this.endDate = new Date();
		this.startDate.setDate(this.startDate.getDate());
		this.endDate.setDate(this.startDate.getDate() + 1);
		console.log("Start Date :: ", this.startDate);
		console.log("End Date :: ", this.endDate);

		var datePipe = new DatePipe('en-US');



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

	get formControls() { return this.addProjectForm.controls; }

	error: any = { isError: false, errorMessage: '' };

	compareTwoDates() {
		console.log('date ::', this.addProjectForm.controls['endDate'].value)
		console.log('date ::', this.addProjectForm.controls['startDate'].value)
		if (new Date(this.addProjectForm.controls['endDate'].value) < new Date(this.addProjectForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};
		}
	}


	onSubmit() {
		console.log('date ::', this.addProjectForm.controls['endDate'].value)
		console.log('date ::', this.addProjectForm.controls['startDate'].value)

		if (this.addProjectForm.controls['projectName'].value === '') {
			this.error = {
				isError: true, errorMessage: 'Project Name is required.'
			};
			return;
		} else if (this.addProjectForm.controls['startDate'].value === '' || this.addProjectForm.controls['endDate'].value === '') {

			this.error = {
				isError: true, errorMessage: 'Enter value for both Start Date and end Date'
			};
			return;
		} else if (new Date(this.addProjectForm.controls['endDate'].value) < new Date(this.addProjectForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};
			return;
		}
		else {
			this.error = {
				isError: false, errorMessage: ''
			};
			this.projectService.createProject(this.addProjectForm.value)
				.subscribe(data => {
					console.log("Add-project After Project: ", JSON.stringify(data));
					this.router.navigate(['add-project']);
				});

		}

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
