const ACCESS_TOKEN_KEY_NAME = 'ff-atoken';
// const REFRESH_TOKEN_KEY_NAME = 'ff-rtoken';

const getToken = (): string => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};

export { getToken, saveToken, dropToken };
