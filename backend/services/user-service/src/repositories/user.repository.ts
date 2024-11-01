import { db } from '../db/postgresDB';
import { RegisterUserSchema, UserSchema } from '../models/user.model';
import { OwnerRegisterSchema } from '../models/owner.model';

export const userRepository = {
  findUser: async (email: string) => {
    const user = await db.query<UserSchema>(
      'SELECT user_id, password, user_type, name FROM user_table WHERE email = $1 AND user_type != $2',
      [email, 'ADMIN']
    );
    return user.rows[0]; // Returns the first user found
  },

  findAdmin: async (email: string) => {
    const user = await db.query<UserSchema>(
      'SELECT user_id, password, user_type, name FROM user_table WHERE email = $1 AND user_type = $2',
      [email, 'ADMIN']
    );
    return user.rows[0]; // Returns the first user found
  },

  createUser: async (user: RegisterUserSchema) => {
    await db.query(
      `INSERT INTO user_table(name, email, password, user_type)
      VALUES($1, $2, $3, $4)`,
      [user.name, user.email, user.password, user.userType]
    );

    const newUser = await db.query<UserSchema>(
      'SELECT user_id, user_type, name FROM user_table WHERE email = $1',
      [user.email]
    );

    return newUser.rows[0];
  },

  createOwner: async (owner: OwnerRegisterSchema) => {
    await db.query(
      `
    INSERT INTO OWNER (owner_id, identity_card_number, tel)
    VALUES ($1, $2, $3)`,
      [owner.ownerId, owner.identityCardNumber, owner.telephoneNumber]
    );

    const newOwner = await db.query<UserSchema>(
      'SELECT owner_id, identity_card_number, tel FROM OWNER WHERE owner_id = $1',
      [owner.ownerId]
    );

    return newOwner.rows[0];
  },
};