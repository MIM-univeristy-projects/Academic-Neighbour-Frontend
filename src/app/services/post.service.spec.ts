import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('PostService', () => {
    let service: PostService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PostService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get posts', (done) => {
        service.getPosts().subscribe((posts) => {
            expect(posts).toBeTruthy();
            expect(posts.length).toBeGreaterThan(0);
            done();
        });
    });

    it('should create a post', (done) => {
        const postData = { text: 'Test post' };
        service.createPost(postData).subscribe((post) => {
            expect(post).toBeTruthy();
            expect(post.text).toBe('Test post');
            done();
        });
    });

    it('should like a post', (done) => {
        service.getPosts().subscribe((posts) => {
            const postId = posts[0].id;
            service.likePost(postId).subscribe((likedPost) => {
                expect(likedPost).toBeTruthy();
                expect(likedPost.id).toBe(postId);
                done();
            });
        });
    });
});
