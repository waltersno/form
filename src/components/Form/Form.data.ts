import { IFormItem } from 'shared/types';
import { IValidationFields } from './Form.types';

export interface IUserData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
}

export const initialFormState: IUserData = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
};

type TFormItems = ({
  onChangeLastName,
  onChangeFirstName,
  onChangePhone,
  onChangeCity,
  userData,
  validationData,
}: {
  onChangeLastName: IFormItem['onChange'];
  onChangeFirstName: IFormItem['onChange'];
  onChangePhone: IFormItem['onChange'];
  onChangeCity: IFormItem['onChange'];
  userData: IUserData;
  validationData: IValidationFields;
}) => IFormItem[];

export const getFormItems: TFormItems = ({
  onChangeLastName,
  onChangeFirstName,
  onChangePhone,
  onChangeCity,
  userData,
  validationData,
}) => [
  {
    onChange: onChangeLastName,
    type: 'text',
    placeholder: 'Фамилия',
    value: userData.lastName,
    validateInfo: validationData.lastNameError,
  },
  {
    onChange: onChangeFirstName,
    type: 'text',
    placeholder: 'Имя',
    value: userData.firstName,
    validateInfo: validationData.firstNameError,
  },
  {
    onChange: onChangePhone,
    type: 'tel',
    placeholder: 'Номер телефона',
    value: userData.phone,
    validateInfo: validationData.phoneError,
  },
  {
    onChange: onChangeCity,
    type: 'text',
    placeholder: 'Город',
    value: userData.city,
    validateInfo: validationData.cityError,
  },
];
