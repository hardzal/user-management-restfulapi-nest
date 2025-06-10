import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../models/web.model';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../models/user.model';
import { Auth } from '../common/auth.decoratoar';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(200)
  async register(
    @Body() registerRequest: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(registerRequest);

    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() loginRequest: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(loginRequest);

    return {
      data: result,
    };
  }

  @Get('/current')
  @HttpCode(200)
  get(@Auth() user: User): WebResponse<UserResponse> {
    const result = this.userService.get(user);
    return {
      data: result,
    };
  }
}
