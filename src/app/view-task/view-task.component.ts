import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
	selector: 'app-view-task',
	templateUrl: './view-task.component.html',
	styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

	tasks: Task[];

	searchTerm: string;

	key: string = 'name'; //set default
	reverse: boolean = false;

	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}

	constructor(private router: Router, private taskService: TaskService) { }

	ngOnInit() {
		this.taskService.getTaskDetails()
			.subscribe(data => {
				this.tasks = data;
				console.log("List-User :: ", JSON.stringify(data));
			});
	}

	editTask(task: Task): void {
		console.log("edit-task id :: :: ", task.taskId.toString());
		localStorage.removeItem("editTaskId");
		localStorage.setItem("taskObj", task.taskId.toString());
		this.router.navigate(['edit-task']);
	};

	endTask(task: Task): void {
		console.log("Delete-project :: ", JSON.stringify(task));
		this.taskService.endTask(task.taskId)
			.subscribe(data => {
				this.tasks = this.tasks.filter(u => u !== task);
			})
	};

}
