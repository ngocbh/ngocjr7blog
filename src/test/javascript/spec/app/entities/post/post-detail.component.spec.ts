/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Ngocjr7BlogTestModule } from '../../../test.module';
import { PostDetailComponent } from '../../../../../../main/webapp/app/entities/post/post-detail.component';
import { PostService } from '../../../../../../main/webapp/app/entities/post/post.service';
import { Post } from '../../../../../../main/webapp/app/entities/post/post.model';

describe('Component Tests', () => {

    describe('Post Management Detail Component', () => {
        let comp: PostDetailComponent;
        let fixture: ComponentFixture<PostDetailComponent>;
        let service: PostService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Ngocjr7BlogTestModule],
                declarations: [PostDetailComponent],
                providers: [
                    PostService
                ]
            })
            .overrideTemplate(PostDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Post(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.post).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
