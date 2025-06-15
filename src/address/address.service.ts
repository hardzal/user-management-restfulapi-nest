import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  UpdateAddressRequest,
} from '../../src/models/address.model';
import { Logger } from 'winston';
import { ContactService } from '../../src/contact/contact.service';
import { AddressValidation } from './address.validation';
import { Address, User } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    const createRequest: CreateAddressRequest = this.validationService.validate(
      AddressValidation.CREATE,
      request,
    );

    await this.contactService.checkContactMustExists(
      user.username,
      createRequest.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: createRequest,
    });

    return this.toAddressResponse(address);
  }

  async checkAddressMustExists(
    contactId: number,
    addressId: number,
  ): Promise<Address | null> {
    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new HttpException('Address is not found', 404);
    }

    return address;
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest: GetAddressRequest = this.validationService.validate(
      AddressValidation.GET,
      request,
    );

    await this.contactService.checkContactMustExists(
      user.username,
      getRequest.contact_id,
    );

    const address = await this.checkAddressMustExists(
      getRequest.contact_id,
      getRequest.address_id,
    );

    return this.toAddressResponse(address);
  }

  async update(
    user: User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    const updateRequest: UpdateAddressRequest = this.validationService.validate(
      AddressValidation.UPDATE,
      request,
    );

    await this.contactService.checkContactMustExists(
      user.username,
      updateRequest.contact_id,
    );

    const checkAddress = await this.checkAddressMustExists(
      updateRequest.contact_id,
      updateRequest.id,
    );

    // this.logger.debug(
    //   `AddressService.update(${JSON.stringify(checkAddress)}, ${JSON.stringify(updateRequest)})`,
    // );

    // if (!checkAddress) {
    //   throw new HttpException('Error, Address not found', 404);
    // }

    const address = await this.prismaService.address.update({
      where: {
        id: checkAddress?.id,
        contact_id: checkAddress?.contact_id,
      },
      data: updateRequest,
    });

    return this.toAddressResponse(address);
  }

  async remove(
    user: User,
    request: RemoveAddressRequest,
  ): Promise<AddressResponse> {
    const removeRequest: RemoveAddressRequest = this.validationService.validate(
      AddressValidation.REMOVE,
      request,
    );

    await this.contactService.checkContactMustExists(
      user.username,
      removeRequest.contact_id,
    );

    await this.checkAddressMustExists(
      removeRequest.contact_id,
      removeRequest.address_id,
    );

    const address = await this.prismaService.address.delete({
      where: {
        id: removeRequest.address_id,
        contact_id: removeRequest.contact_id,
      },
    });

    return this.toAddressResponse(address);
  }

  async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await this.contactService.checkContactMustExists(user.username, contactId);
    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => this.toAddressResponse(address));
  }

  toAddressResponse(address: Address | null): AddressResponse {
    return {
      id: address?.id || 0,
      street: address?.street || '',
      city: address?.city || '',
      province: address?.province || '',
      country: address?.country || '',
      postal_code: address?.postal_code || '',
    };
  }
}
