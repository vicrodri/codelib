import { ApiAuthResponse, AppError, AuthDetail, RequestOptions } from "../model";
import { buildApiUrl, setSessionStorageItem } from "../utils/Utils";

export const login = async (authDetail: AuthDetail): Promise<ApiAuthResponse> => {
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const url = buildApiUrl(`login`);
  const apiResponse: ApiAuthResponse = await sendAuthRequest(url, requestOptions);

  if (apiResponse.response?.accessToken) {
    setSessionStorageItem<string>("token", apiResponse.response.accessToken);
    setSessionStorageItem<number>("cbid", apiResponse.response.user.id);
  }

  return apiResponse;
};

export const register = async (authDetail: AuthDetail): Promise<ApiAuthResponse> => {
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const url = buildApiUrl(`register`);
  const apiResponse: ApiAuthResponse = await sendAuthRequest(url, requestOptions);

  if (apiResponse.response?.accessToken) {
    setSessionStorageItem<string>("token", apiResponse.response.accessToken);
    setSessionStorageItem<number>("cbid", apiResponse.response.user.id);
  }

  return apiResponse;
};

export const logout = () => {
  sessionStorage.clear();
};

const sendAuthRequest = async (url: string, requestOptions: RequestOptions) => {
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data = await response.json();

  const result: ApiAuthResponse = {
    code: response.status as number,
    response: data.accessToken ? data : null,
    message: !data.accessToken ? data : null,
  };

  return result;
};
