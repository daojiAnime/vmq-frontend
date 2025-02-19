import { requestClient } from '#/api/request';

enum SettingApiUrls {
  Settings = '/settings',
}

export namespace SettingsApi {
  export interface SettingBase {
    id?: number;
    uid?: string;
    secret_key?: string;
    wechat_qrcode?: string;
    alipay_qrcode?: string;
    notify_url?: string;
    return_url?: string;
    app_id?: string;
    order_interval?: number;
    is_order_price_increase?: boolean;
    order_real_price_step?: number;
    [key: string]: any;
  }

  export interface PageFetchParams extends SettingBase {
    /**
     * 页码
     */
    page: number;
    /**
     * 每页条数
     */
    pageSize: number;
    [key: string]: any;
  }

  export interface MultiParams extends SettingBase {
    /**
     * ID列表
     */
    ids: number[];
  }

  export interface ListResponse {
    items: SettingBase[];
    total: number;
  }
}

/**
 * 获取设置列表
 */
export async function getSettingsApi() {
  return requestClient.get<SettingsApi.SettingBase>(SettingApiUrls.Settings);
}

/**
 * 更新设置
 */
export async function updateSettingApi(params: SettingsApi.MultiParams) {
  return requestClient.put(SettingApiUrls.Settings, params);
}
