import {Component, OnInit} from '@angular/core';
import {Category, CategoryService} from '../../entities/category';
import {ResponseWrapper} from '../../shared';
import {JhiAlertService} from 'ng-jhipster';
import {Post, PostService} from '../../entities/post';

@Component({
    selector: 'jhi-sidebar-widgets-col',
    templateUrl: './sidebar-widgets-col.component.html',
    styleUrls: [
        'sidebar-widgets-col.css'
    ]
})
export class SidebarWidgetsColComponent implements OnInit {
    categories: Category[];
    posts: Post[];
    constructor(
        private categoryService: CategoryService,
        private jhiAlertService: JhiAlertService,
        private postService: PostService
    ) {
    }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.categoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.categories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.postService.query().subscribe(
            (res: ResponseWrapper) => {
                this.posts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        )
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
