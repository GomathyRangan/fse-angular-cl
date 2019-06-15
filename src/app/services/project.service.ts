import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';

@Injectable({
    providedIn: 'root'
})


export class ProjectService {

    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8090/';
    apiResponse: any;

    getAllProjects() {
        const projects = this.http.get<Project[]>(this.baseUrl + 'getProjectDetails');
        //console.log(" -- User List -- "+JSON.stringify(users.body))
        //return users;

        return this.http.get(this.baseUrl + 'getProjectDetails')
            .map(data => {
                this.apiResponse = data;
                // the console.log(...) line prevents your code from working 
                // either remove it or add the line below (return ...)
                console.log("UserService SEE DATA HERE: ", JSON.stringify(this.apiResponse));
                return this.apiResponse;
            });
    }

    getProjectById(id: number) {
        return this.http.get<User>(this.baseUrl + 'getProjectById/' + id);
    }

    createProject(project: Project) {
        console.log("ProjectService CreateProject :: ", JSON.stringify(project));
        return this.http.post(this.baseUrl + 'addProject', project);
    }

    updateProject(project: Project) {
        return this.http.put(this.baseUrl + 'updateProject/' , project);
    }

    deleteProject(id: number) {
        return this.http.delete(this.baseUrl + 'deleteProject/' + id);
    }
}
