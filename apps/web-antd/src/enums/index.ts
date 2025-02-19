export enum RoleEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUPER = 'super',
}

/**
 * 订单类型
 */
export enum OrderType {
  /**
   * 支付宝
   */
  ALIPAY = 2,
  /**
   * 微信
   */
  WECHAT = 1,
}

/**
 * 订单状态
 */
export enum OrderStatus {
  /**
   * 已过期
   */
  EXPIRED = -1,
  /**
   * 通知失败
   */
  NOTIFY_FAILED = 2,
  /**
   * 待支付
   */
  PENDING = 0,
  /**
   * 支付成功
   */
  SUCCESS = 1,
}
