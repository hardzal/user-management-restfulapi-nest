import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcyrpt from 'bcrypt';
import { Address, Contact, User } from '@prisma/client';
@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        username: 'test_user',
      },
    });
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test_user',
      },
    });
  }

  async deleteAddress() {
    await this.prismaService.address.deleteMany({
      where: {
        contact: {
          username: 'test_user',
        },
      },
    });
  }

  async getUser(): Promise<User | null> {
    return await this.prismaService.user.findUnique({
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

  async getContact(): Promise<Contact | null> {
    return await this.prismaService.contact.findFirst({
      where: {
        username: 'test_user',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        username: 'test_user',
        first_name: 'test_contact',
        last_name: 'test_contact_last',
        email: 'test@example.com',
        phone: '6287781383892',
      },
    });
  }

  async getAddress(): Promise<Address | null> {
    return await this.prismaService.address.findFirst({
      where: {
        contact: {
          username: 'test_user',
        },
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    await this.prismaService.address.create({
      data: {
        contact_id: contact?.id as number,
        street: 'New street test',
        city: 'city test',
        province: 'province test',
        country: 'country test',
        postal_code: '1234',
      },
    });
  }
}
