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
        this.taskService.editTask(this.editTaskForm.value)
            .subscribe(data => {
                console.log("Edit-TAsk After Create: ", JSON.stringify(data));
                this.router.navigate(['view-task']);
            });
    }

}
