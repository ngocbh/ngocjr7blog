import { Route } from '@angular/router';

import { HomeComponent } from './';
import {PostComponent} from '../entities/post';

export const HOME_ROUTE: Route = {
    path: '',
    component: PostComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
