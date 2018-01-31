import { BaseEntity, User } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public content?: string,
        public vote?: number,
        public user?: User,
        public post?: BaseEntity,
        public pcomment?: BaseEntity,
        public replies?: BaseEntity[],
    ) {
    }
}
