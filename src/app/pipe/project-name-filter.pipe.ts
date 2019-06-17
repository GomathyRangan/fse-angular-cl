import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../model/project.model';

@Pipe({
  name: 'projectNameFilter'
})
export class ProjectNameFilterPipe implements PipeTransform {

    transform(projects: Project[], searchTerm: string): Project[] {

        if (!projects || !searchTerm) {
            return projects;
        }

        return projects.filter(project =>
            project.projectName.indexOf(searchTerm) !== -1);
    }

}
