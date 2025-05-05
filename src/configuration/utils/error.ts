import { logger } from '@/configuration/utils/logger';

interface ErrorInterface {
  error(message: unknown, context: string): never;

  getErrorMessage: (error: unknown) => string;
}

class ErrorHandler implements ErrorInterface {
  error(message: unknown, context: string): never {
    const errorMessage = this.getErrorMessage(message);
    logger.error(errorMessage, context);
    throw new Error(errorMessage);
  }

  getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message.trim() || error.stack || 'Erreur inconnue';
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const potentialMessage = (error as { message?: string }).message;
      if (typeof potentialMessage === 'string' && potentialMessage.trim().length > 0) {
        return potentialMessage;
      }
    }

    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  };
}

export const ErrorInstance = new ErrorHandler();
