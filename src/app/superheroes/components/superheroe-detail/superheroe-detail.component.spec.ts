import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroeDetailComponent } from './superheroe-detail.component';

describe('SuperheroeDetailComponent', () => {
  let component: SuperheroeDetailComponent;
  let fixture: ComponentFixture<SuperheroeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
