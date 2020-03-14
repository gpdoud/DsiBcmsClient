import { Pipe, PipeTransform } from '@angular/core';
import { Menu } from './menu.class';
import { User } from '@feat/user/user.class';

@Pipe({
  name: 'security'
})
export class MenuSecurityPipe implements PipeTransform {

  transform(menus: Menu[], user: User = null): any {
    let isRootOrAdmin = (user != null) 
      ? user.role.isRoot || user.role.isAdmin
      : false;
    let isInstructor = (user != null) 
      ? user.role.isInstructor
      : false;

    let selMenus: Menu[] = [];
    for(let m of menus) {
      /*
        The only time a menu item is not displayed is if
        the menu requires admin and the user is not an admin

        a: reqsAdm, b: isRootOrAdmin
        
        | a | b | !a | !a | b |
        | f | f |  t |    t   |
        | f | t |  t |    t   |
        | t | f |  f |    f   |
        | t | t |  f |    t   |
      */
      if(!m.reqsAdm || isRootOrAdmin) {
        selMenus.push(m);
        continue;
      }
      if(m.reqsInstructor && isInstructor) {
        selMenus.push(m);
        continue;
      }
    }
    return selMenus;
  }

}
