import { useState } from 'react';

import { localStorageService } from 'shared/services/localStorage';
import { userDataKey } from './Form.constants';
import { IUserData } from './Form.data';

export const useAllowedActions = () => {
  const savedUser: null | IUserData = localStorageService.getItem(userDataKey);
  const [allowedActions, setAllowedActions] = useState({
    saveUser: !savedUser,
    editUser: !!savedUser,
    deleteUser: !!savedUser,
  });

  const setActionsAfterUserDeleted = () => {
    setAllowedActions((prev) => ({
      ...prev,
      saveUser: true,
      deleteUser: false,
      editUser: false,
    }));
  };

  const setActionsAfterUserChanged = () => {
    setAllowedActions((prev) => ({
      ...prev,
      saveUser: false,
      deleteUser: true,
      editUser: true,
    }));
  };

  return {
    allowedActions,
    setActionsAfterUserDeleted,
    setActionsAfterUserChanged,
  };
};
