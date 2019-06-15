import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user.model';

@Pipe({
    name: 'userNameFilterPipe'
})
export class UserNameFilterPipePipe implements PipeTransform {

    transform(users: User[], searchTerm: string): User[] {

        if (!users || !searchTerm) {
            return users;
        }

        return users.filter(user =>
            user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}
