import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '@role/role.class';

@Pipe({
  name: 'roleSrch'
})
export class RoleSearchPipe implements PipeTransform {

  transform(roles: Role[], criteria: string = ''): Role[] {
    if(criteria == '') { return roles; }
    let selUsers: Role[] = [];
    roles.forEach(role => {
      if(
        role.code.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        role.name.toLowerCase().includes(criteria.toLowerCase()) ||
        role.isAdmin.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        role.isStaff.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        role.isInstructor.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        role.isStudent.toString().toLowerCase().includes(criteria.toLowerCase())
      ) { selUsers.push(role); }
    });
    return selUsers;
  }

}
