import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcyrpt from 'bcrypt';
@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test_user',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test_user',
        name: 'test user',
        password: await bcyrpt.hash('test_user', 10),
        email: 'test_email@example.com',
        token: 'test',
      },
    });
  }
}
