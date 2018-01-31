import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Post } from './post.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PostService {

    private resourceUrl =  SERVER_API_URL + 'api/posts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(post: Post): Observable<Post> {
        const copy = this.convert(post);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(post: Post): Observable<Post> {
        const copy = this.convert(post);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Post> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Post.
     */
    private convertItemFromServer(json: any): Post {
        const entity: Post = Object.assign(new Post(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Post to a JSON which can be sent to the server.
     */
    private convert(post: Post): Post {
        const copy: Post = Object.assign({}, post);

        copy.date = this.dateUtils.toDate(post.date);
        return copy;
    }
}
