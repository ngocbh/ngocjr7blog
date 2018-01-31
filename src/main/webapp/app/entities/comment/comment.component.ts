import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { Principal, ResponseWrapper } from '../../shared';
import {Post} from '../post';
import {Input} from '@angular/core';

@Component({
    selector: 'jhi-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit, OnDestroy {
    @Input('post') post: Post;
    comments: Comment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commentService: CommentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.comments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAllByPostId(id) {
        this.commentService.queryByStoryId(id).subscribe(
            (res: ResponseWrapper) => {
                this.comments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAllByPostId(this.post.id);
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Comment) {
        return item.id;
    }
    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        console.log('olala');
        console.log(error);
        this.jhiAlertService.error(error.message, null, null);
    }
}
