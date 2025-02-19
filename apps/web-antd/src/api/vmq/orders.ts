import type { OrderStatus, OrderType } from '#/enums';

import { requestClient } from '#/api/request';

enum OrderApiUrls {
  Orders = '/orders',
}

export namespace OrdersApi {
  export interface OrderBase {
    id?: number;
    uid?: string;
    type?: OrderType;
    state?: OrderStatus;
    pay_id?: string;
    price?: number;
    real_price?: number;
    notify_url?: string;
    return_url?: string;
    callback_args?: Record<string, any>;
    created_at?: string;
    updated_at?: string;
    [key: string]: any;
  }

  export interface PageFetchParams extends OrderBase {
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

  export interface CreateOrderParams extends OrderBase {
    type: OrderType;
    payId: string;
    price: number;
    realPrice?: number;
    notifyUrl?: string;
    returnUrl?: string;
    callbackArgs?: Record<string, any>;
  }

  export interface MultiParams extends OrderBase {
    /**
     * ID列表
     */
    ids: number[];
  }

  export interface ListResponse {
    items: OrderBase[];
    total: number;
  }
}

/**
 * 获取订单列表
 */
export async function getOrdersApi(params: OrdersApi.PageFetchParams) {
  return requestClient.get<OrdersApi.ListResponse>(OrderApiUrls.Orders, {
    params,
  });
}

/**
 * 创建订单
 */
export async function createOrderApi(params: OrdersApi.CreateOrderParams) {
  return requestClient.post<OrdersApi.OrderBase>(OrderApiUrls.Orders, params);
}

/**
 * 更新订单
 */
export async function updateOrderApi(params: OrdersApi.MultiParams) {
  return requestClient.put(OrderApiUrls.Orders, params);
}

/**
 * 删除订单
 */
export async function deleteOrderApi(params: OrdersApi.MultiParams) {
  return requestClient.delete(OrderApiUrls.Orders, {
    params,
  });
}
