import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import 'rxjs/Rx';



@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8090/';
    apiResponse: any;

    getUsers() {     
        
        const users = this.http.get<User[]>(this.baseUrl+ 'getAllUsers');
        //console.log(" -- User List -- "+JSON.stringify(users.body))
        //return users;
       // getUserUrl: string = this.baseUrl + '/getAllUsers';
        return this.http.get(this.baseUrl  + 'getAllUsers')
            .map(data => {
                this.apiResponse = data;
                // the console.log(...) line prevents your code from working 
                // either remove it or add the line below (return ...)
                console.log("UserService SEE DATA HERE: ", JSON.stringify(this.apiResponse));
                return this.apiResponse;
            });
    }

    getUserById(id: number) {
        return this.http.get<User>(this.baseUrl + 'getUserById/' + id);
    }

    createUser(user: User) {
        console.log("UserService CreateUser :: ", JSON.stringify(user));
        return this.http.post(this.baseUrl + 'addOrUpdateUser', user);
    }

    updateUser(user: User) {
        console.log("UserService updateUser :: ", JSON.stringify(user));
        return this.http.post(this.baseUrl + 'addOrUpdateUser', user);
    }

    deleteUser(id: number) {
         console.log("UserService deleteUser :: ", id);
        return this.http.delete(this.baseUrl + 'deleteUser/' + id);
    }
}
