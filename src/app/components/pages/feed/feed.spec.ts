import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feed } from './feed';

describe('Feed', () => {
  let component: Feed;
  let fixture: ComponentFixture<Feed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feed],
    }).compileComponents();

    fixture = TestBed.createComponent(Feed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', (done) => {
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();

    setTimeout(() => {
      expect(component.isLoading).toBeFalse();
      expect(component.posts.length).toBeGreaterThan(0);
      done();
    }, 600);
  });

  it('should create new post', () => {
    const initialLength = component.posts.length;
    component.onCreatePost({ text: 'Test post' });
    expect(component.posts.length).toBe(initialLength + 1);
    expect(component.posts[0].text).toBe('Test post');
  });

  it('should like a post', () => {
    component.posts = [
      {
        id: 1,
        text: 'Test',
        author_id: 1,
        created_at: new Date().toISOString(),
      },
    ];
    component.onLikePost(1);
    expect(component.posts[0]).toBeTruthy();
  });
});
