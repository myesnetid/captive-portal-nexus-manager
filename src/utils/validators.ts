
import { VALIDATION_RULES } from './constants';

export const validateVoucherCode = (code: string): boolean => {
  return code.length === VALIDATION_RULES.VOUCHER_CODE_LENGTH && /^[A-Z0-9]+$/.test(code);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
};

export const validateUsername = (username: string): boolean => {
  return username.length > 0 && 
         username.length <= VALIDATION_RULES.MAX_USERNAME_LENGTH &&
         /^[a-zA-Z0-9_.-]+$/.test(username);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
