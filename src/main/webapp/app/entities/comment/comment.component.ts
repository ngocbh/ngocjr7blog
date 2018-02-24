import { Component, OnInit, OnDestroy } from '@angular/core';
import {Input} from '@angular/core';
import {Comment} from './comment.model';
import {CommentService} from './comment.service';

@Component({
    selector: 'jhi-comment',
    templateUrl: './comment.component.html',
    styleUrls: [
        'comment.css'
    ]
})
export class CommentComponent implements OnInit, OnDestroy {
    @Input('comment') comment: Comment;
    @Input('authorizedComment') authorizedComment: boolean;
    isEditting: Boolean = false;

    constructor(private commentService: CommentService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    likeComment() {
        this.comment.vote++;
    }

    send() {
        this.commentService.update(this.comment);
        this.isEditting = !this.isEditting;
    }
}
