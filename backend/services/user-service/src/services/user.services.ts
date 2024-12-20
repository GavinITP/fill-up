import { RegisterUserSchema } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { OwnerRegisterSchema, VerifyOwnerSchema } from '../models/owner.model';

dotenv.config({ path: './.env', override: true });

export const userService = {
  register: async (body: RegisterUserSchema) => {
    const name = body.name;
    const email = body.email;
    const password = body.password;

    const user = await userRepository.findUser(email);
    if (user !== undefined) {
      return { success: false, message: 'This user has registered' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserInfo: RegisterUserSchema = {
      name,
      email,
      password: hashedPassword,
      userType: 'USER',
    };

    const newUser = await userRepository.createUser(newUserInfo);

    if (newUser === undefined) {
      return { success: false, message: 'Cannot create new user' };
    }

    const token = jsonwebtoken.sign(
      newUser.user_id,
      process.env.JWT_SECRET as string
    );

    return {
      success: true,
      message: 'Successfully create new user',
      _id: newUser.user_id,
      name: newUser.name,
      role: newUser.user_type,
      email: email,
      token,
    };
  },

  login: async (body: { email: string; password: string; role: string }) => {
    const email = body.email;
    const password = body.password;

    const user = await (body.role == 'user'
      ? userRepository.findUser(email)
      : userRepository.findAdmin(email));
    if (user === undefined) {
      return { success: false, message: "This email hasn't registered" };
    }

    const collectedPassword: string = user.password;

    const isMatch = await bcrypt.compare(password, collectedPassword);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = jsonwebtoken.sign(
      user.user_id,
      process.env.JWT_SECRET as string
    );
    return {
      success: true,
      message: 'Successfully log in',
      _id: user.user_id,
      name: user.name,
      role: user.user_type,
      email: email,
      token,
    };
  },

  registerOwner: async (owner: OwnerRegisterSchema) => {
    const isSuccess = await userRepository.createOwner(owner);

    return {
      success: isSuccess,
      message: isSuccess ? 'success' : 'error to create register',
    };
  },

  getOwnerRequests: async () => {
    const ownerRequests = await userRepository.getOwnerRequests();

    return {
      success: true,
      message: 'success',
      owners: ownerRequests,
    };
  },

  verifyOwner: async (owner: VerifyOwnerSchema) => {
    const isSuccess = await userRepository.verifyOwner(owner);

    return {
      success: isSuccess,
      message: isSuccess ? 'success' : 'error to verify owner',
    };
  },

  getUserEmailAndName: async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (user === undefined) {
      return { success: false, message: "Cannot find user" };
    }
    return {
      success: true,
      message: 'success',
      email: user?.email,
      name: user?.name,
    };
  }
};
