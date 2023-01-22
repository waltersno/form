import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

import { FormItem } from 'components/FormItem';
import { Button } from 'shared/components/Button';
import { Spin } from 'shared/components/Spin';
import { localStorageService } from 'shared/services/localStorage';
import {
  cityErrorText,
  fakeFetchTime,
  firstNameErrorText,
  lastNameErrorText,
  onlyNumbersRegExp,
  phoneErrorText,
  twoValueRegExp,
  userDataKey,
} from './Form.constants';
import { IUserData, initialFormState, getFormItems } from './Form.data';
import { getErrorData, wait } from './Form.helper';
import { useAllowedActions } from './Form.hooks';
import { IValidationFields } from './Form.types';

import classes from './Form.module.scss';

export const Form = () => {
  const savedUser: null | IUserData = localStorageService.getItem(userDataKey);

  const [isLoading, setIsLoading] = useState(false);
  const [validationData, setValidationData] = useState<IValidationFields>({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    cityError: '',
  });
  const { allowedActions, setActionsAfterUserDeleted, setActionsAfterUserChanged } =
    useAllowedActions();
  const [userData, setUserData] = useState<IUserData>(savedUser || initialFormState);

  const onChangeLastName: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const isContainsTwoSymbols = twoValueRegExp.test(value);
    setValidationData((prev) => ({
      ...prev,
      lastNameError: isContainsTwoSymbols ? '' : lastNameErrorText,
    }));

    setUserData((prevData) => ({ ...prevData, lastName: event.target.value }));
  };

  const onChangeFirstName: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const isContainsTwoSymbols = twoValueRegExp.test(value);
    setValidationData((prev) => ({
      ...prev,
      firstNameError: isContainsTwoSymbols ? '' : firstNameErrorText,
    }));

    setUserData((prevData) => ({ ...prevData, firstName: value }));
  };

  const onChangeCity: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const isContainsTwoSymbols = twoValueRegExp.test(value);
    setValidationData((prev) => ({
      ...prev,
      cityError: isContainsTwoSymbols ? '' : cityErrorText,
    }));

    setUserData((prevData) => ({ ...prevData, city: value }));
  };

  const onChangePhone: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const isOnlyNumbers = onlyNumbersRegExp.test(value);
    setValidationData((prev) => ({
      ...prev,
      phoneError: isOnlyNumbers ? '' : phoneErrorText,
    }));
    setUserData((prevData) => ({ ...prevData, phone: value }));
  };

  const handleChangeUser: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const errorData = getErrorData(userData);

    if (errorData.isAllFieldsValid) {
      setIsLoading(true);
      await wait(fakeFetchTime);
      localStorageService.setItem(userDataKey, userData);
      setActionsAfterUserChanged();
    } else {
      setValidationData(errorData.errorData);
    }

    setIsLoading(false);
  };

  const handleDeleteUser: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true);
    await wait(fakeFetchTime);
    localStorageService.removeItem(userDataKey);
    setUserData(initialFormState);
    setActionsAfterUserDeleted();
    setIsLoading(false);
  };

  const formItems = getFormItems({
    onChangeCity,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    userData,
    validationData,
  });

  return (
    <div className={classes.formContainer}>
      {isLoading && (
        <div className={classes.loadingOverlay}>
          <Spin />
        </div>
      )}

      <h4 className={classes.formHead}>Добро пожаловать</h4>

      <form className={classes.form}>
        {formItems.map(({ onChange, placeholder, type, validateInfo, value }, index) => (
          <FormItem
            key={index}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            value={value}
            validateInfo={validateInfo}
          />
        ))}

        <div className={classes.formButtonWrapper}>
          <div className={classes.topSubmitButtons}>
            <Button disabled={!allowedActions.saveUser} type='submit' onClick={handleChangeUser}>
              Сохранить
            </Button>

            <Button onClick={handleChangeUser} disabled={!allowedActions.editUser} type='submit'>
              Редактировать
            </Button>
          </div>

          <Button
            disabled={!allowedActions.deleteUser}
            color='danger'
            type='button'
            onClick={handleDeleteUser}
          >
            Удалить пользователя
          </Button>
        </div>
      </form>
    </div>
  );
};
