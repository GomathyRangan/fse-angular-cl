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

    onSubmit() {
        this.taskService.createTask(this.addTaskForm.value)
            .subscribe(data => {
                console.log("Add-TAsk After Create: ", JSON.stringify(data));
                this.router.navigate(['add-task']);
            });
    }
}
