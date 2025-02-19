<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getOrdersApi } from '#/api';
import { OrderStatus, OrderType } from '#/enums';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'pay_id',
      label: '商单号',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '支付宝',
            value: OrderType.ALIPAY,
          },
          {
            label: '微信',
            value: OrderType.WECHAT,
          },
        ],
      },
      fieldName: 'type',
      label: '订单类型',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '已过期',
            value: OrderStatus.EXPIRED,
          },
          {
            label: '通知失败',
            value: OrderStatus.NOTIFY_FAILED,
          },
          {
            label: '待支付',
            value: OrderStatus.PENDING,
          },
          {
            label: '支付成功',
            value: OrderStatus.SUCCESS,
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'state',
      label: '订单状态',
    },
    {
      component: 'InputNumber',
      fieldName: 'price',
      label: '订单金额',
    },
    {
      component: 'InputNumber',
      fieldName: 'real_price',
      label: '实际金额',
    },
    {
      component: 'RangePicker',
      defaultValue: [dayjs().subtract(7, 'days'), dayjs()],
      fieldName: 'date',
      label: '创建时间',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const getOrderStatus = ({ cellValue }: { cellValue: number }) => {
  switch (cellValue) {
    case OrderStatus.EXPIRED: {
      return '已过期';
    }
    case OrderStatus.NOTIFY_FAILED: {
      return '通知失败';
    }
    case OrderStatus.PENDING: {
      return '待支付';
    }
    case OrderStatus.SUCCESS: {
      return '支付成功';
    }
    default: {
      return '未知';
    }
  }
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { title: 'ID', field: 'id', visible: false },
    { title: '商单号', field: 'pay_id' },
    {
      title: '订单状态',
      field: 'state',
      width: 100,
      formatter: getOrderStatus,
    },
    {
      title: '订单类型',
      field: 'type',
      width: 100,
      formatter: (row) =>
        row.cellValue === OrderType.WECHAT ? '微信' : '支付宝',
    },
    { title: '订单金额', field: 'price', width: 100 },
    { title: '实际金额', field: 'real_price', width: 100 },
    {
      title: '创建时间',
      field: 'created_at',
      formatter: 'formatDateTime',
      width: 180,
    },
    {
      title: '更新时间',
      field: 'updated_at',
      formatter: 'formatDateTime',
      width: 180,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getOrdersApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
