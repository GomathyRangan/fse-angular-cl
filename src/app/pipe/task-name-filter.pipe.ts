import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task.model';

@Pipe({
  name: 'taskNameFilter'
})
export class TaskNameFilterPipe implements PipeTransform {

transform(tasks: Task[], searchTerm: string): Task[] {

        if (!tasks || !searchTerm) {
            return tasks;
        }

        return tasks.filter(task =>
            task.task.indexOf(searchTerm) !== -1);
    }

}
