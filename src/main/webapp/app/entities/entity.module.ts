import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Ngocjr7BlogCategoryModule } from './category/category.module';
import { Ngocjr7BlogPostModule } from './post/post.module';
import { Ngocjr7BlogTagModule } from './tag/tag.module';
import { Ngocjr7BlogCommentModule } from './comment/comment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Ngocjr7BlogCategoryModule,
        Ngocjr7BlogPostModule,
        Ngocjr7BlogTagModule,
        Ngocjr7BlogCommentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ngocjr7BlogEntityModule {}
