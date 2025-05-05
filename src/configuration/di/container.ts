import 'reflect-metadata';
import { container } from 'tsyringe';

import { OnNewTransactionUseCase } from '@/application/usecasses/onNewTransactionUseCase';
import type { OnNewTransactionUseCaseInterface } from '@/application/usecasses/onNewTransactionUseCase/interface';
import type { LoggerInterface } from '@/domain/interfaces/logger.interface';
import type { TransactionRepositoryInterface } from '@/domain/interfaces/repositories/TransactionRepositoryInterface/interface';
import type { UserRepositoryInterface } from '@/domain/interfaces/repositories/UserRepositoryInterface/interface';
import type { UserServicesInterface } from '@/domain/interfaces/services/UserServicesInterface/interface';
import { Logger } from '@/gateways/logger';
import { TransactionRepository } from '@/gateways/repositories/TransactionRepository';
import { UserRepository } from '@/gateways/repositories/UserRepository';
import { UserServices } from '@/gateways/services/UserServices';
import { Database } from '@/infrastructure/database';
import type { DatabaseInterface } from '@/infrastructure/database/interface';

// - Application :

// - UseCase

container.register<OnNewTransactionUseCaseInterface>(
  'OnNewTransactionUseCaseInterface',
  OnNewTransactionUseCase,
);

// - Gateways :

// Logger
container.register<LoggerInterface>('LoggerInterface', Logger);

// - Repositories :

// Transaction
container.register<TransactionRepositoryInterface>(
  'TransactionRepositoryInterface',
  TransactionRepository,
);

// User
container.register<UserRepositoryInterface>('UserRepositoryInterface', UserRepository);

// - Services :

// User
container.register<UserServicesInterface>('UserServicesInterface', UserServices);

// - Infrastructure :

// Database
container.register<DatabaseInterface>('DatabaseInterface', Database);

export const ContainerInstance = container;
