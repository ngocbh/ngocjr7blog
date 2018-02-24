import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ResumeComponent} from './resume.component';
import {Ngocjr7BlogSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import { RESUME_ROUTE } from './resume.route';

@NgModule({
    imports: [
        Ngocjr7BlogSharedModule,
        RouterModule.forChild([RESUME_ROUTE])
    ],
    exports: [

    ],
    declarations: [
        ResumeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgocJr7BlogResumeModule {}
