import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) { }

	editTaskForm: FormGroup;

	error: any = { isError: false, errorMessage: '' };

	compareTwoDates() {
		if (new Date(this.editTaskForm.controls['endDate'].value) < new Date(this.editTaskForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};
		}
	}

	ngOnInit() {

		this.editTaskForm = this.formBuilder.group({
			taskId: [],
			parentId: ['', Validators.required],
			projectId: ['', Validators.required],
			task: ['', Validators.required],
			priority: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			userId: ['', Validators.required]
		});

	}

	onSubmit() {

		if (this.editTaskForm.controls['task'].value === '') {
			this.error = {
				isError: true, errorMessage: 'Task Name is required.'
			};
			return;
		} else if (this.editTaskForm.controls['startDate'].value === '' || this.editTaskForm.controls['endDate'].value === '') {

			this.error = {
				isError: true, errorMessage: 'Enter value for both Start Date and end Date'
			};
			return;
		} else if (new Date(this.editTaskForm.controls['endDate'].value) < new Date(this.editTaskForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};

		} else {
			this.error = {
				isError: false, errorMessage: ''
			};
			this.taskService.editTask(this.editTaskForm.value)
				.subscribe(data => {
					console.log("Edit-TAsk After Create: ", JSON.stringify(data));
					this.router.navigate(['view-task']);
				});
		}
	}

}
