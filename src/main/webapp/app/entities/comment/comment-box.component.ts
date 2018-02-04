import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'jhi-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: [
        'comment-box.css'
    ]
})
export class CommentBoxComponent {
    @Input() message: String;
    @Output('messageChange') messageChange: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
        this.message = '';
    }

    postComment() {
        this.messageChange.emit(this.message);
    }
}
