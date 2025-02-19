import { requestClient } from '#/api/request';

enum MonitorApiUrls {
  Monitor = '/monitor',
  MonitorState = '/monitor/state',
}

export namespace MonitorApi {
  export interface MonitorBase {
    state?: boolean;
    last_heartbeat?: string;
    last_payment?: string;
    config_address?: string;
    [key: string]: any;
  }

  export interface PageFetchParams extends MonitorBase {
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

  export interface MultiParams extends MonitorBase {
    /**
     * ID列表
     */
    ids: number[];
  }

  export interface ListResponse {
    items: MonitorBase[];
    total: number;
  }
}

/**
 * 获取设置列表
 */
export async function getMonitorStateApi() {
  return requestClient.get<MonitorApi.MonitorBase>(MonitorApiUrls.MonitorState);
}
