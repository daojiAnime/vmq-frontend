import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }

  export interface RegisterParams {
    email?: string;
    password?: string;
    username?: string;
  }

  export interface ForgetPasswordParams {
    email?: string;
  }

  export interface ResetPasswordParams {
    password?: string;
    token?: string;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  // return requestClient.get<string[]>('/auth/codes');
  return [];
}

/**
 * 注册
 */
export async function registerApi(data: AuthApi.RegisterParams) {
  return requestClient.post('/auth/register', data);
}

/**
 * 忘记密码
 */
export async function forgetPasswordApi(data: AuthApi.ForgetPasswordParams) {
  return requestClient.post(`/password-recovery/${data.email}`);
}

/**
 * 重置密码
 */
export async function resetPasswordApi(data: AuthApi.ResetPasswordParams) {
  return requestClient.post('/reset-password', data);
}
