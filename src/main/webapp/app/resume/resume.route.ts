import {Route} from '@angular/router';
import {ResumeComponent} from './resume.component';

export const RESUME_ROUTE: Route = {
    path: 'resume',
    component: ResumeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.resume'
    },
    // outlet: 'resume'
}
