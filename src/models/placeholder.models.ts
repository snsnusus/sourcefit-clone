export interface ApiErrorResponse {
  code: string;
  status: number;
  error: string;
}

export interface PostParams {
  title: string;
  body: string;
  userId: number;
}

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    get: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
