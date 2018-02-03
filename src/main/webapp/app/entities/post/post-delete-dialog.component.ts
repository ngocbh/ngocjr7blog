import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { Post } from './post.model';
import { PostPopupService } from './post-popup.service';
import { PostService } from './post.service';
import {Comment, CommentService} from '../comment';
import {ResponseWrapper} from '../../shared';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'jhi-post-delete-dialog',
    templateUrl: './post-delete-dialog.component.html'
})
export class PostDeleteDialogComponent {

    post: Post;
    comments: Comment[];
    constructor(
        private postService: PostService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private commentService: CommentService,
        private jhiAlertService: JhiAlertService
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        const observable = Observable.create( (observer) => {
            this.commentService.queryByPostId(id).subscribe(
                (res: ResponseWrapper) => {
                    this.comments = res.json;
                    observer.next(this.comments);
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        });

        observable.subscribe(
            (comments) => {
                for (let i = 0; i < comments.length; i++) {
                    this.commentService.delete(comments[i].id).subscribe((response) => {
                        this.eventManager.broadcast({
                            name: 'commentListModification',
                            content: 'Deleted an comment'
                        });
                        this.activeModal.dismiss(true);
                    });
                }

                this.postService.delete(id).subscribe((response) => {
                    this.eventManager.broadcast({
                        name: 'postListModification',
                        content: 'Deleted an post'
                    });
                    this.activeModal.dismiss(true);
                });
            }
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-post-delete-popup',
    template: ''
})
export class PostDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postPopupService: PostPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.postPopupService
                .open(PostDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
