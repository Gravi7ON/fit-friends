import jwt_decode from 'jwt-decode';
import { AuthorizationStatus } from 'src/constant';
import { REFRESH_TOKEN_KEY_NAME, getToken } from 'src/services/token.stotage';
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
    }
  }

  return { authorizationStatus: AuthorizationStatus.NoAuth };
}
