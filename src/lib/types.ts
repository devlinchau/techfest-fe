export type Detail = {
  user: User;
  income: number;
  grade: string;
  employee_length: number;
  house_ownership: string;
}

export type User = {
  username: string;
  email: string;
  password: string;
}