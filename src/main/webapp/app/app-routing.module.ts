import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {errorRoute, navbarRoute, sidebarNavRoute} from './layouts';
import {HOME_ROUTE} from './home';
import {RESUME_ROUTE} from './resume/resume.route';

const LAYOUT_ROUTES = [
    sidebarNavRoute,
    navbarRoute,
    HOME_ROUTE,
    RESUME_ROUTE,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class Ngocjr7BlogAppRoutingModule {}
