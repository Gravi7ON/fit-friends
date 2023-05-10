export const ACCESS_TOKEN_KEY_NAME = 'ff-atoken';
export const REFRESH_TOKEN_KEY_NAME = 'ff-rtoken';

const getToken = (tokenType: string): string => {
  const token = localStorage.getItem(tokenType);
  return token ?? '';
};

const saveToken = (tokenType: string, token: string): void => {
  localStorage.setItem(tokenType, token);
};

const dropToken = (tokenType: string): void => {
  localStorage.removeItem(tokenType);
};

export { getToken, saveToken, dropToken };
