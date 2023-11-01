import { TestBed } from '@angular/core/testing';

import { SuperheroesService } from './superheroes.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
