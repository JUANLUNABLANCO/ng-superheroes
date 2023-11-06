import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroEditComponent } from './superhero-edit.component';

describe('SuperheroEditComponent', () => {
  let component: SuperheroEditComponent;
  let fixture: ComponentFixture<SuperheroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
