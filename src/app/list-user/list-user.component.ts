import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';


@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

    users: User[];
    searchTerm: string;

    key: string = 'name'; //set default
    reverse: boolean = false;
    
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
                console.log("List-User :: ", JSON.stringify(data));
            });
    }

    deleteUser(user: User): void {
        console.log("Delete-User :: ", JSON.stringify(user));
        this.userService.deleteUser(user.id)
            .subscribe(data => {
                this.users = this.users.filter(u => u !== user);
            })
    };

    editUser(user: User): void {
        console.log("edit-User id :: :: ", user.id.toString());
        localStorage.removeItem("editUserId");
        localStorage.setItem("editUserId", user.id.toString());
        this.router.navigate(['edit-user']);
    };

    addUser(): void {
        this.router.navigate(['add-user']);
    };
}
