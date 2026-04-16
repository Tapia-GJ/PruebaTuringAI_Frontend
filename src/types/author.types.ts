export interface Author {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthorPayload {
  name: string;
}
