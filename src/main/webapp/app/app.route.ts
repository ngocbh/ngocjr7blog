import { Route } from '@angular/router';

import {NavbarComponent, SidebarNavComponent} from './layouts';

export const navbarRoute: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
};

export const sidebarNavRoute: Route = {
    path: '',
    component: SidebarNavComponent,
    outlet: 'sidebar'
}
