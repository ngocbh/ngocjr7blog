import {Component, OnInit, OnDestroy, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { Principal, ResponseWrapper } from '../../shared';
import {Post} from '../post';
import {Input} from '@angular/core';

@Component({
    selector: 'jhi-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: [
        'comment.css'
    ]
})
export class CommentListComponent implements OnInit, OnDestroy, OnChanges {
    @Input('post') post: Post;
    comments: Comment[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isVisibleTextArea: Boolean = false;
    message: string;
    newComment: Comment = new Comment();

    constructor(
        private commentService: CommentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    send() {
        if (this.message) {
            this.newComment.content = this.message;
            this.newComment.post = this.post;
            this.newComment.vote = 0;
            this.newComment.user = this.currentAccount;
            this.commentService.save(this.newComment);
            this.isVisibleTextArea = !this.isVisibleTextArea;
        }
    }

    authorizedComment(index: number): boolean {
        if (this.currentAccount) {
            if (this.currentAccount.login === 'admin' || this.comments[index].user.id === this.currentAccount.id) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        };
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
        this.commentService.queryByPostId(id).subscribe(
            (res: ResponseWrapper) => {
                this.comments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadAllByPostId(changes.post.currentValue.id);
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
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', (response) => this.loadAllByPostId(this.post.id));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
