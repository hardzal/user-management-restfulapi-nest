export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export class UserResponse {
  username: string;
  name: string;
  email: string;
  token?: string;
  created_at: Date;
}
