export interface Author {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface WorkGenre {
  workId: number;
  genreId: number;
  genre: Genre;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  coverUrl: string | null;
  publishYear: number | null;
  authorId: number;
  author: Author;
  workGenres: WorkGenre[];
  createdAt: string;
  updatedAt: string;
}
