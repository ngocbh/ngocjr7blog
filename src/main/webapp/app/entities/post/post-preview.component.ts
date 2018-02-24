import {Component, Input} from '@angular/core';
import {Post} from './post.model';

@Component({
    selector: 'jhi-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: [
        'post-preview.css'
    ]
})
export class PostPreviewComponent {
    @Input() post: Post;

    previewContent(content: String): String {
        let countString = 0;
        let preContent: String = '';
        let isInTag = false;
        for (let i = 0; i < content.length && countString < 100; i++) {
            if ( isInTag && content[i] === '>' ) { isInTag = false; }
            if ( !isInTag && content[i] === '<' ) { isInTag = true; }

            if ( !isInTag &&  content[i] === ' ' && content[i - 1] !== ' ' )  {
                ++countString;
            }
            preContent = preContent + content[i];
        }
        preContent = preContent + '...';
        return preContent;
    }
}
