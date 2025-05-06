import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegistrationSchema = z
  .object({
    name: z.string().min(5, { message: 'Name must be at least 5 characters long.' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type RegistrationType = z.infer<typeof RegistrationSchema>;

export const UserSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required.' }),
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  emailVerified: z.boolean(),
});

export type UserType = z.infer<typeof UserSchema>;

export const EmailOTPSchema = z.object({
  pin: z
    .string()
    .length(6, { message: 'The code must be exactly 6 digits.' })
    .regex(/^[0-9]{6}$/, { message: 'The code must contain only digits.' }),
});

export type EmailOTPValues = z.infer<typeof EmailOTPSchema>;

export const TransactionAlertSchema = z.object({
  id: z.string().uuid({ message: 'ID must be a valid UUID.' }),
  userId: z.string().uuid({ message: 'User ID must be a valid UUID.' }),
  email: z.string().email({ message: 'Email must be valid.' }),
  address: z
    .string()
    .length(42, { message: 'Address must be a valid Ethereum address.' })
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: 'Address must be a valid Ethereum address.',
    }),
  chainId: z
    .number()
    .int({ message: 'Chain ID must be an integer.' })
    .nonnegative({ message: 'Chain ID must be a non-negative integer.' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isActive: z.boolean(),
});

export type TransactionAlertType = z.infer<typeof TransactionAlertSchema>;

export const CreateTransactionAlertSchema = z.object({
  email: z.string().email({ message: 'Email must be valid.' }),
  address: z
    .string()
    .length(42, { message: 'Address must be a valid Ethereum address.' })
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: 'Address must be a valid Ethereum address.',
    }),
  chainId: z
    .number()
    .int({ message: 'Chain ID must be an integer.' })
    .nonnegative({ message: 'Chain ID must be a non-negative integer.' }),
});

export type CreateTransactionAlertType = z.infer<typeof CreateTransactionAlertSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation don't match.",
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from the current password.',
    path: ['newPassword'],
  });

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
