import { Request, Response } from 'express';
import { userService } from '../services/user.services';
import { LoginUserSchema, RegisterUserSchema } from '../models/user.model';
import { OwnerRegisterSchema, VerifyOwnerSchema } from '../models/owner.model';

const loginUser = async (req: Request, res: Response) => {
  const loginUser: LoginUserSchema = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(400).json({
      message: 'Cannot log in, email or password is missing',
      success: false,
    });
  }

  const result = await userService.login(loginUser);
  if (!result.success) return res.status(400).json(result);
  console.log('User logged in');
  res.status(201).json(result);
};

const registerUser = async (req: Request, res: Response) => {
  const registerUser: RegisterUserSchema = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    userType: 'USER',
  };

  if (
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.name === undefined
  ) {
    return res.status(400).json({
      message: 'Cannot register, information is missing',
      success: false,
    });
  }

  const result = await userService.register(registerUser);
  if (!result.success) return res.status(400).json(result);
  console.log('User registered');
  res.status(201).json({ success: true });
};

const registerOwner = async (req: Request, res: Response) => {
  const owner: OwnerRegisterSchema = {
    ownerId: req.body.ownerId,
    identityCardNumber: req.body.identityCardNumber,
    telephoneNumber: req.body.telephoneNumber,
  };

  const result = await userService.registerOwner(owner);

  if (!result.success) return res.status(400).json(result);
  console.log('Owner registered');
  res.status(201).json({ success: true });
};

const getNewOwners = async (req: Request, res: Response) => {
  const result = await userService.getNewOwners();
  if (!result.success) return res.status(400).json(result);
  res.status(200).json(result);
};

const verifyOwner = async (req: Request, res: Response) => {
  const owner: VerifyOwnerSchema = {
    ownerId: req.body.ownerId,
    isApproved: req.body.isApproved,
  };

  const result = await userService.verifyOwner(owner);

  if (!result.success) return res.status(400).json(result);
  console.log('Owner verified');
  res.status(200).json({ success: true });
}

export const userController = {
  loginUser,
  registerUser,
  registerOwner,
  getNewOwners,
  verifyOwner
};
