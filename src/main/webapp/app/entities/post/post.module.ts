import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ngocjr7BlogSharedModule } from '../../shared';
import {
    PostService,
    PostPopupService,
    PostComponent,
    PostDetailComponent,
    PostDialogComponent,
    PostDirectionComponent,
    PostDeletePopupComponent,
    PostDeleteDialogComponent,
    postRoute,
    postPopupRoute,
} from './';
import {Ngocjr7BlogCommentModule} from '../comment/comment.module';
import { CKEditorModule} from 'ng2-ckeditor';
import {CkeditorComponent} from './ckeditor.component';

const ENTITY_STATES = [
    ...postRoute,
    ...postPopupRoute,
];

@NgModule({
    imports: [
        Ngocjr7BlogSharedModule,
        Ngocjr7BlogCommentModule,
        CKEditorModule,
        RouterModule.forChild(ENTITY_STATES),
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
    ],
    declarations: [
        PostComponent,
        PostDetailComponent,
        PostDialogComponent,
        PostDeleteDialogComponent,
        PostDirectionComponent,
        PostDeletePopupComponent,
        CkeditorComponent
    ],
    entryComponents: [
        PostComponent,
        PostDialogComponent,
        PostDirectionComponent,
        PostDeleteDialogComponent,
        PostDeletePopupComponent,
    ],
    providers: [
        PostService,
        PostPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ngocjr7BlogPostModule {}
