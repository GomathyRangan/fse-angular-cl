import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    addForm: FormGroup;

    ngOnInit() {

        this.addForm = this.formBuilder.group({
            id: [],
            employeeId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

    }

    onSubmit() {
        this.userService.createUser(this.addForm.value)
            .subscribe(data => {
                console.log("Add-User After Create: ", JSON.stringify(data));
                this.router.navigate(['add-user']);
            });
    }

}
