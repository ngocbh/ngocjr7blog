import {
    Component, OnInit, OnDestroy, ComponentFactoryResolver, ComponentFactory, ComponentRef,
    ReflectiveInjector, ViewChild, ViewContainerRef, Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Post } from './post.model';
import { PostPopupService } from './post-popup.service';
import { PostService } from './post.service';
import { Category, CategoryService } from '../category';
import { Tag, TagService } from '../tag';
import { ResponseWrapper } from '../../shared';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'jhi-post-dialog',
    templateUrl: './post-dialog.component.html'
})
export class PostDialogComponent implements OnInit {

    @Input() post: Post;
    isSaving: boolean;
    categories: Category[];

    tags: Tag[];

    constructor(
        private datePipe: DatePipe,
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private categoryService: CategoryService,
        private tagService: TagService,
        private eventManager: JhiEventManager,
    ) {

    }

    ngOnInit() {
        console.log(1);
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.post.date = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss')
        if (this.post.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(
                this.postService.create(this.post));
        }
    }

    private subscribeToSaveResponse(result: Observable<Post>) {
        result.subscribe((res: Post) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Post) {
        this.eventManager.broadcast({ name: 'postListModification', content: 'OK'});
        this.isSaving = false;
        window.history.back();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }

    trackTagById(index: number, item: Tag) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-post-popup',
    template: ''
})
export class PostDirectionComponent implements OnInit, OnDestroy {
    routeSub: any;
    componentRef: ComponentRef<any>;
    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostPopupService,
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postPopupService
                    .open(PostDialogComponent as Component, params['id']).then((post) => {
                        this.container.clear();
                        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PostDialogComponent);
                        this.componentRef = this.container.createComponent(factory);
                        this.componentRef.instance.post = post;
                });
            } else {
                this.postPopupService
                    .open(PostDialogComponent as Component).then((post) => {
                        this.container.clear();
                        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PostDialogComponent);
                        this.componentRef = this.container.createComponent(factory);
                        this.componentRef.instance.post = post; // Must set post in PostDialogComponent is Input Data Binding
                });
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
