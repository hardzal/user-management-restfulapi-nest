import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from '../models/address.model';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import { WebResponse } from 'src/models/web.model';

@Controller('/api/contacts/:contactId/addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: CreateAddressRequest,
  ) {
    request.contact_id = contactId;

    const result = await this.addressService.create(user, request);

    return {
      data: result,
    };
  }

  @Get('/:addressId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<WebResponse<AddressResponse>> {
    const request: GetAddressRequest = {
      address_id: addressId,
      contact_id: contactId,
    };

    const result = await this.addressService.get(user, request);

    return {
      data: result,
    };
  }

  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() request: UpdateAddressRequest,
  ) {
    request.contact_id = contactId;
    request.id = addressId;

    const result = await this.addressService.update(user, request);

    return {
      data: result,
    };
  }
}
