import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8090/';
    apiResponse: any;

      createTask(task: Task) {
        console.log("TaskService CreateTask :: ", JSON.stringify(task));
        return this.http.post(this.baseUrl + 'addTask', task);
    }


    
    getTaskDetails() {     
        
        const users = this.http.get<Task[]>(this.baseUrl+ 'getAllTask');
        //console.log(" -- User List -- "+JSON.stringify(users.body))
        //return users;
       // getUserUrl: string = this.baseUrl + '/getAllUsers';
        return this.http.get(this.baseUrl  + 'getAllTask')
            .map(data => {
                this.apiResponse = data;
                // the console.log(...) line prevents your code from working 
                // either remove it or add the line below (return ...)
                console.log("TaskService SEE DATA HERE: ", JSON.stringify(this.apiResponse));
                return this.apiResponse;
            });
    }

     editTask(task: Task) {
        console.log("TaskService editTask :: ", JSON.stringify(task));
        return this.http.put(this.baseUrl + 'updateTask', task);
    }

     endTask(taskId: number) {

        console.log("TaskService endTask :: ", JSON.stringify(taskId));
        return this.http.put(this.baseUrl + 'updateTaskStatus', taskId);
    }
}
