import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
	selector: 'app-add-task',
	templateUrl: './add-task.component.html',
	styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) { }

	addTaskForm: FormGroup;

	ngOnInit() {

		this.addTaskForm = this.formBuilder.group({
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

	get formControls() {
		return this.addTaskForm
			.controls;
	}

	error: any = { isError: false, errorMessage: '' };

	compareTwoDates() {
		if (new Date(this.addTaskForm.controls['endDate'].value) < new Date(this.addTaskForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};
		}
	}

	onSubmit() {
		if (this.addTaskForm.controls['task'].value === '') {
			this.error = {
				isError: true, errorMessage: 'Task Name is required.'
			};
			return;
		} else if (this.addTaskForm.controls['startDate'].value === '' || this.addTaskForm.controls['endDate'].value === '') {

			this.error = {
				isError: true, errorMessage: 'Enter value for both Start Date and end Date'
			};
			return;
		} else if (new Date(this.addTaskForm.controls['endDate'].value) < new Date(this.addTaskForm.controls['startDate'].value)) {
			this.error = {
				isError: true, errorMessage: 'End Date shoule be greater than start date.'
			};

		} else {
			this.error = {
				isError: false, errorMessage: ''
			};
			this.taskService.createTask(this.addTaskForm.value)
				.subscribe(data => {
					console.log("Add-TAsk After Create: ", JSON.stringify(data));
					this.router.navigate(['add-task']);
				});
		}
	}
}
