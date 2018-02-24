import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import { Category } from './category.model';
import { CategoryService } from './category.service';
import {ITEMS_PER_PAGE, ResponseWrapper} from '../../shared';
import {Post, PostService} from '../post';

@Component({
    selector: 'jhi-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

    category: Category;
    posts: Post[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    page: any;
    itemsPerPage: number;
    links: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private eventManager: JhiEventManager,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private postService: PostService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService
    ) {
        this.posts = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = false;
    }

    loadAllByCategoryId(id: number) {
        this.postService.queryByCategoryId({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }, id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.posts = [];
            this.load(params['id']);
            this.loadAllByCategoryId(params['id']);
        });
        this.registerChangeInCategories();
    }

    load(id) {
        this.categoryService.find(id).subscribe((category) => {
            this.category = category;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategories() {
        this.registerChangeInPosts();
        this.eventSubscriber = this.eventManager.subscribe(
            'categoryListModification',
            (response) => this.load(this.category.id)
        );
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe('postListModification', (response) => this.reset());
    }

    reset() {
        this.page = 0;
        this.posts = [];
        this.loadAllByCategoryId(this.category.id);
    }

    loadPage(page) {
        this.page = page;
        this.loadAllByCategoryId(this.category.id);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = data.length; i >= 0; i--) {
            this.posts.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
