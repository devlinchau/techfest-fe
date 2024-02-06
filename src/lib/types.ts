export type Detail = {
  user: User;
  income: number;
  grade: string;
  employee_length: number;
  home_ownership: string;
}

export type User = {
  username: string;
  email: string;
  password: string;
}