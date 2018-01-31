import { BaseEntity } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
        public date?: any,
        public category?: BaseEntity,
        public tags?: BaseEntity[],
        public comments?: BaseEntity[],
    ) {
    }
}
