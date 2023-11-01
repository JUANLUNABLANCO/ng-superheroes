import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIsAuthenticatedComponent } from './user-is-authenticated.component';

describe('UserIsAuthenticatedComponent', () => {
  let component: UserIsAuthenticatedComponent;
  let fixture: ComponentFixture<UserIsAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIsAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIsAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
