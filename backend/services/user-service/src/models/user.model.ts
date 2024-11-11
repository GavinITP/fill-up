export type UserType = 'USER' | 'OWNER' | 'ADMIN';

export interface RegisterUserSchema {
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

export interface LoginUserSchema {
  email: string;
  password: string;
  role: string;
}

export interface UserSchema {
  user_id: string;
  name: string;
  email: string;
  password: string;
  user_type: UserType;
  created_at: Date;
  updated_at: Date;
}
