import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ngocjr7BlogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {Ngocjr7BlogPostModule} from '../entities/post/post.module';

@NgModule({
    imports: [
        Ngocjr7BlogSharedModule,
        Ngocjr7BlogPostModule,
        RouterModule.forChild([ HOME_ROUTE ]),
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ngocjr7BlogHomeModule {}
