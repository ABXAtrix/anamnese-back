import { container } from "tsyringe";
import type { PrismaClient } from "@prisma/client";
import CreateUserService from "../app/services/user/CreateUserService.service.js";
import type { IUserRepository } from "../app/repositories/user/IUserRepository.js";
import { UserRepository } from "../app/repositories/user/UserRepository.js";
import prisma from "../configs/database.js";
import type { IStorageProvider } from "../app/providers/blobStorage/IStorageProvider.js";
import { BlobStorageProvider } from "../app/providers/blobStorage/BlobStorageProvider.js";
import UpdateUserService from "../app/services/user/UpdateUserService.service.js";
import DeleteUserService from "../app/services/user/DeleteUserService.service.js";
import { FindByIdUserService } from "../app/services/user/FindByIdUserService.service.js";
import { GetAllUserService } from "../app/services/user/GetAllUserService.service.js";
import LoginAuthService from "../app/services/auth/LoginAuthService.service.js";
import { MeAuthService } from "../app/services/auth/MeAuthService.service.js";
import type { IMailProvider } from "../app/providers/mail/IMailProvider.js";
import { MailProvider } from "../app/providers/mail/MailProvider.js";

//* User
container.registerSingleton<CreateUserService>(
  "CreateUserService",
  CreateUserService
);

container.registerSingleton<DeleteUserService>(
  "DeleteUserService",
  DeleteUserService
);

container.registerSingleton<FindByIdUserService>(
  "FindByIdUserService",
  FindByIdUserService
);

container.registerSingleton<UpdateUserService>(
  "UpdateUserService",
  UpdateUserService
);

container.registerSingleton<GetAllUserService>(
  "GetAllUserService",
  GetAllUserService
);

container.registerSingleton<IUserRepository>(
  "UserRepository", 
  UserRepository
);

//* Storage Provider
container.registerSingleton<IStorageProvider>(
  "BlobStorageProvider",
  BlobStorageProvider
);

//* Auth
container.registerSingleton<LoginAuthService>(
  "LoginAuthService",
  LoginAuthService
);

container.registerSingleton<MeAuthService>(
  "MeAuthService",
  MeAuthService
);

//* Mail Provider
container.registerSingleton<IMailProvider>(
  "MailProvider",
  MailProvider
);

//* PrismaClient é uma implementação concreta, mas os repositories já abstraem o acesso ao banco.
//^ Criar uma interface genérica para o Prisma seria over-engineering — os repositories são a abstração.
container.registerInstance<PrismaClient>(
  "PrismaClient",
  prisma
);