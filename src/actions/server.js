export const SS_AUTH_TOKEN_UPDATE = "SS_AUTH_TOKEN_UPDATE";
export const SS_TOKEN_VALIDATION_COMPLETE = "SS_TOKEN_VALIDATION_COMPLETE";
export const SS_TOKEN_VALIDATION_ERROR = "SS_TOKEN_VALIDATION_ERROR";

export function ssAuthTokenUpdate({user, headers, mustResetPassword, firstTimeLogin, endpointKey}) {
  return { type: SS_AUTH_TOKEN_UPDATE, user, headers, mustResetPassword, firstTimeLogin, endpointKey };
}

export function ssTokenValidationComplete({user, headers, mustResetPassword, firstTimeLogin, endpointKey}) {
  return { type: SS_TOKEN_VALIDATION_COMPLETE, user, headers, mustResetPassword, firstTimeLogin, endpointKey };
}

export function ssTokenValidationError() {
  return { type: SS_TOKEN_VALIDATION_ERROR };
}
