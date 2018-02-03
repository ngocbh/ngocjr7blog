import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Post } from './post.model';
import { PostService } from './post.service';

@Injectable()
export class PostPopupService {

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private postService: PostService

    ) {
    }

    open(component: Component, id?: number | any): Promise<Post> {
        return new Promise<Post>((resolve, reject) => {
            if (id) {
                this.postService.find(id).subscribe((post) => {
                    post.date = this.datePipe
                        .transform(post.date, 'yyyy-MM-ddTHH:mm:ss');
                    resolve(post);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    resolve(new Post());
                }, 0);
            }
        });
    }
}
