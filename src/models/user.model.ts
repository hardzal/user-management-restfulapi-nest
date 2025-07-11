export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
  email: string;
  token?: string;
}

export class UserResponse {
  username: string;
  name: string;
  email: string;
  token?: string;
  created_at: Date;
}

export class UpdateUserRequest {
  name?: string;
  password?: string;
  email?: string;
}
