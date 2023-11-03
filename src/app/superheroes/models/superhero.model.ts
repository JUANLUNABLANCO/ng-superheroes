export interface Superhero {
  id?: number;
  name?: string;
  alias?: string;
  powers?: string[];
  enemies?: string[];
  city?: string;
  image?: string;
  bio?: string;
}

export interface createSuperheroDTO extends Omit<Superhero, 'id'> {}

export interface updateSuperheroDTO extends Partial<Superhero> {}

export interface ISuperheroesPaginated {
  items: Superhero[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
}