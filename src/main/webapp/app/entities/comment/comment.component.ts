import { Component, OnInit, OnDestroy } from '@angular/core';
import {Input} from '@angular/core';
import {Comment} from './comment.model';

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

    constructor() {
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    likeComment() {
        this.comment.vote++;
    }
}
