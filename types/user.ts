export type UserWithTokenType = {
  token: string;
  user: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
