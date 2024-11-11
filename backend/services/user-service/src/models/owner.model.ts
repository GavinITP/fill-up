export interface OwnerRegisterSchema {
  ownerId: string;
  identityCardNumber: string;
  telephoneNumber: string;
}

export interface VerifyOwnerSchema {
  ownerId: string;
  isApproved: boolean;
}