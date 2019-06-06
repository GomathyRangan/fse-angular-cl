import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    addTaskForm: FormGroup;

    ngOnInit() {

        this.addTaskForm = this.formBuilder.group({
            id: [],
            employeeId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

    }

    onSubmit() {
        this.userService.createUser(this.addTaskForm.value)
            .subscribe(data => {
                console.log("Add-User After Create: ", JSON.stringify(data));
                this.router.navigate(['add-user']);
            });
    }
}
