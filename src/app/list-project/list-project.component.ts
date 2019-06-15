import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project.model';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

   projects: Project[];

    constructor(private router: Router, private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.getAllProjects()
            .subscribe(data => {
                this.projects = data;
                console.log("List-User :: ", JSON.stringify(data));
            });
    }

    deleteProject(project: Project): void {
        console.log("Delete-project :: ", JSON.stringify(project));
        this.projectService.deleteProject(project.projectId)
            .subscribe(data => {
                this.projects = this.projects.filter(u => u !== project);
            })
    };

    editProject(project: Project): void {
        console.log("edit-project :: ", JSON.stringify(project));
        localStorage.removeItem("editProjectId");
        localStorage.setItem("editProjectId", project.projectId.toString());
        this.router.navigate(['edit-project']);
    };

    addProject(): void {
        this.router.navigate(['add-user']);
    };
}
