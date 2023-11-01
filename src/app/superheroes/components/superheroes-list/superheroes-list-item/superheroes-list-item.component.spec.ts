import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesListItemComponent } from './superheroes-list-item.component';

describe('SuperheroesListItemComponent', () => {
  let component: SuperheroesListItemComponent;
  let fixture: ComponentFixture<SuperheroesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroesListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
