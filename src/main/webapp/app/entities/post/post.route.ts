import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PostComponent } from './post.component';
import { PostDetailComponent } from './post-detail.component';
import {PostDialogComponent, PostDirectionComponent} from './post-dialog.component';
import { PostDeletePopupComponent } from './post-delete-dialog.component';

export const postRoute: Routes = [
    {
        path: 'post',
        component: PostComponent,
        data: {
            authorities: [],
            pageTitle: 'ngocjr7BlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post/:id',
        component: PostDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'ngocjr7BlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post-new',
        component: PostDirectionComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ngocjr7BlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'post/:id/edit',
        component: PostDirectionComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ngocjr7BlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
    }
];

export const postPopupRoute: Routes = [
    {
        path: 'post/:id/delete',
        component: PostDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ngocjr7BlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
