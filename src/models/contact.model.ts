export class ContactResponse {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  created_at: Date;
}

export class CreateContactRequest {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}
