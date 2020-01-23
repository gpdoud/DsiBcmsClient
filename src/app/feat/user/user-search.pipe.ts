import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.class';

@Pipe({
  name: 'userSrch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users: User[], criteria: string = ''): User[] {
    if(criteria == '') { return users; }
    let selUsers: User[] = [];
    users.forEach(user => {
      if(
        user.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        user.username.toLowerCase().includes(criteria.toLowerCase()) ||
        user.firstname.toLowerCase().includes(criteria.toLowerCase()) ||
        user.lastname.toLowerCase().includes(criteria.toLowerCase()) ||
        (user.email != null && user.email.toLowerCase().includes(criteria.toLowerCase())) ||
        (user.cellPhone != null && user.cellPhone.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (user.workPhone != null && user.workPhone.toLowerCase().includes(criteria.toLowerCase())) ||
        (user.role != null && user.role.name.toLowerCase().includes(criteria.toLowerCase()))
      ) { selUsers.push(user); }
    });
    return selUsers;
  }

}
