import { Route } from '@angular/router';
import {SidebarNavComponent} from './sidebar-nav.component';

export const sidebarNavRoute: Route = {
    path: '',
    component: SidebarNavComponent,
    outlet: 'sidebar'
};
