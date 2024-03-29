import jwt_decode from 'jwt-decode';
import { AuthorizationStatus } from 'src/constant';
import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  dropToken,
  getToken,
} from 'src/services/token.stotage';
import { TokenPayload } from 'src/types/token';

export function checkAuthOnRefresh() {
  const refreshToken = getToken(REFRESH_TOKEN_KEY_NAME);

  if (refreshToken) {
    const MULTIPLIER_TOKEN_EXP_FROM_SECOND_TO_MILISECOND = 1000;

    const decodedToken = jwt_decode<TokenPayload>(refreshToken);
    const isTokenExpires =
      decodedToken.exp * MULTIPLIER_TOKEN_EXP_FROM_SECOND_TO_MILISECOND <
      new Date().getTime();

    if (!isTokenExpires) {
      return { ...decodedToken, authorizationStatus: AuthorizationStatus.Auth };
    } else {
      dropToken(ACCESS_TOKEN_KEY_NAME);
      dropToken(REFRESH_TOKEN_KEY_NAME);
    }
  }

  return { authorizationStatus: AuthorizationStatus.NoAuth };
}

export function hideButtonMoreByCondition(
  listLengthPart: number,
  amountCardPerOne: number,
  pageNumber: number,
  errorPage: number,
  successPage: number
) {
  if (
    pageNumber > 1 &&
    (listLengthPart % amountCardPerOne !== 0 ||
      listLengthPart === 0 ||
      listLengthPart === amountCardPerOne) &&
    errorPage < successPage
  ) {
    return { display: 'none' };
  }

  if (pageNumber === 1 && listLengthPart < amountCardPerOne) {
    return { display: 'none' };
  }
}

export function getObjectWithKeysFromList(list: string[]) {
  const entriesTransform = [...list.entries()].map((entry) => [
    entry[1].toLowerCase(),
    false,
  ]);

  return Object.fromEntries(entriesTransform);
}

export function getArrayWithTruthyKeysFromObject(map: Record<string, boolean>) {
  return Object.entries(map)
    .filter((entry) => Boolean(entry[1]))
    .map((entry) => entry[0]);
}
