<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getSettingsApi, updateSettingApi } from '#/api';
import { QRCodeUpload } from '#/components';

const wechatQRCode = ref('');
const alipayQRCode = ref('');

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'max-w-[500px]',
    },
    labelWidth: 150,
    formItemClass: 'col-start-1',
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,
  layout: 'horizontal',
  schema: [
    {
      component: 'InputNumber',
      fieldName: 'id',
      label: 'ID',
      formItemClass: 'hidden',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'secret_key',
      label: '系统密钥',
      componentProps: {
        placeholder: '请输入密钥',
      },
    },
    {
      component: 'Input',
      fieldName: 'wechat_qrcode',
      label: '微信二维码',
      componentProps: {
        placeholder: '请输入微信二维码',
      },
    },
    {
      component: 'Input',
      fieldName: 'upload-wechat',
      hideLabel: true,
      formItemClass: 'ml-[160px]',
      componentProps: {
        placeholder: '请上传微信二维码',
        disabled: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'alipay_qrcode',
      label: '支付宝二维码',
      componentProps: {
        placeholder: '请输入支付宝二维码',
      },
    },
    {
      component: 'Input',
      fieldName: 'upload-alipay',
      hideLabel: true,
      formItemClass: 'ml-[160px]',
      componentProps: {
        placeholder: '请上传支付宝二维码',
        disabled: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'notify_url',
      label: '异步回调地址',
      componentProps: {
        placeholder: '请输入异步回调地址',
      },
    },
    {
      component: 'Input',
      fieldName: 'return_url',
      label: '同步回调地址',
      componentProps: {
        placeholder: '请输入同步回调地址',
      },
    },
    {
      component: 'Input',
      fieldName: 'app_id',
      label: '应用ID',
      componentProps: {
        placeholder: '请输入应用ID',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'order_interval',
      label: '订单创建间隔时间',
      componentProps: {
        placeholder: '间隔时间',
      },
    },
    {
      component: 'Switch',
      fieldName: 'is_order_price_increase',
      label: '订单价格是否增加',
    },
    {
      component: 'InputNumber',
      fieldName: 'order_real_price_step',
      label: '订单实际价格步长',
      componentProps: {
        placeholder: '价格步长',
      },
    },
  ],
  wrapperClass: 'grid-cols-2',
});

function onSubmit(values: Record<string, any>) {
  updateSettingApi({
    ...values,
    ids: [values.id],
  })
    .then(() => {
      message.success('设置成功');
    })
    .catch((error) => {
      message.error('设置失败');
      console.error(error);
    });
  // message.success({
  //   content: `form values: ${JSON.stringify(values)}`,
  // });
}

async function loadSettingsData() {
  try {
    const setting = await getSettingsApi();
    /**
     * 设置表单值(多个)
     */
    baseFormApi.setValues({
      id: setting.id,
      secret_key: setting.secret_key,
      wechat_qrcode: setting.wechat_qrcode,
      alipay_qrcode: setting.alipay_qrcode,
      notify_url: setting.notify_url,
      return_url: setting.return_url,
      app_id: setting.app_id,
      order_interval: setting.order_interval,
      is_order_price_increase: setting.is_order_price_increase,
      order_real_price_step: setting.order_real_price_step,
    });

    wechatQRCode.value = setting.wechat_qrcode || '';
    alipayQRCode.value = setting.alipay_qrcode || '';
  } catch (error) {
    message.error('获取系统设置失败');
    console.error(error);
  }
}

watch(
  () => wechatQRCode.value,
  (value) => {
    baseFormApi.setValues({ wechat_qrcode: value });
  },
);

watch(
  () => alipayQRCode.value,
  (value) => {
    baseFormApi.setValues({ alipay_qrcode: value });
  },
);

onMounted(() => {
  /**
   * 隐藏id
   */
  // baseFormApi.updateSchema([{ fieldName: 'id', formItemClass: 'hidden' }]);
  loadSettingsData();
});
</script>

<template>
  <Page auto-content-height>
    <Card title="系统设置">
      <BaseForm>
        <template #upload-wechat>
          <QRCodeUpload type="wechat" v-model="wechatQRCode" />
        </template>
        <template #upload-alipay>
          <QRCodeUpload type="alipay" v-model="alipayQRCode" />
        </template>
      </BaseForm>
    </Card>
  </Page>
</template>
