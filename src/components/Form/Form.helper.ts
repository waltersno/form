import {
  onlyNumbersRegExp,
  twoValueRegExp,
  firstNameErrorText,
  lastNameErrorText,
  cityErrorText,
  phoneErrorText,
} from './Form.constants';
import { IUserData } from './Form.data';

export const wait = (time: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
};

export const getErrorData = (userData: IUserData) => {
  const isValidFirstName = twoValueRegExp.test(userData.firstName);
  const isValidLastName = twoValueRegExp.test(userData.lastName);
  const isValidCity = twoValueRegExp.test(userData.city);
  const isValidPhone = onlyNumbersRegExp.test(userData.phone);

  const isAllFieldsValid = isValidFirstName && isValidLastName && isValidCity && isValidPhone;

  return {
    errorData: {
      firstNameError: isValidFirstName ? '' : firstNameErrorText,
      lastNameError: isValidLastName ? '' : lastNameErrorText,
      phoneError: isValidPhone ? '' : phoneErrorText,
      cityError: isValidCity ? '' : cityErrorText,
    },
    isAllFieldsValid,
  };
};
