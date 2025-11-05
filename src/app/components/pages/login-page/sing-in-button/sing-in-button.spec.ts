import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInButton } from './sing-in-button';

describe('SingInButton', () => {
  let component: SingInButton;
  let fixture: ComponentFixture<SingInButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingInButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingInButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
