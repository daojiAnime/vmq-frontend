<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';

import { Page } from '@vben/common-ui';

import { useQRCode } from '@vueuse/integrations/useQRCode';
import { Badge, Card, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { getMonitorStateApi } from '#/api';

const config_address = shallowRef('demo_qrcode_text');
const addr_qrcode = useQRCode(config_address, {
  errorCorrectionLevel: 'H',
  margin: 3,
});

const isLoadedData = ref(false);

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'max-w-[500px]',
    },
    formItemClass: 'col-start-1',
    labelWidth: 150,
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,
  layout: 'horizontal',
  showDefaultActions: false,
  schema: [
    {
      component: 'Switch',
      fieldName: 'state',
      label: '监控端状态',
      dependencies: {
        show: () => isLoadedData.value,
        triggerFields: ['state'],
      },
    },
    {
      component: 'Input',
      fieldName: 'last_heartbeat',
      label: '最后心跳时间',
    },
    {
      component: 'Input',
      fieldName: 'last_payment',
      label: '最后收款',
      componentProps: {
        defaultValue: '@afc163',
      },
    },
    {
      component: 'Input',
      fieldName: 'config_address',
      label: '配置地址',
      defaultValue: 'http://192.168.1.100:8080',
    },
    {
      component: 'Input',
      fieldName: 'qrcode',
      label: '配置二维码',
    },
  ],
  wrapperClass: 'grid-cols-2',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

async function handleSetFormValue() {
  const state = await getMonitorStateApi();
  /**
   * 设置表单值(多个)
   */
  baseFormApi.setValues({
    state: state.state,
    last_heartbeat: state.last_heartbeat
      ? dayjs(state.last_heartbeat).format('YYYY-MM-DD HH:mm:ss')
      : '',
    last_payment: state.last_payment
      ? dayjs(state.last_payment).format('YYYY-MM-DD HH:mm:ss')
      : '',
    config_address: state.config_address,
  });

  config_address.value = state.config_address!;
  isLoadedData.value = true;
}

onMounted(() => {
  // TODO: 请求后台获取数据
  handleSetFormValue();
});
</script>

<template>
  <Page auto-content-height>
    <Card title="监控端">
      <BaseForm>
        <template #state="slotProps">
          <Badge
            :status="slotProps.value ? 'processing' : 'error'"
            :text="slotProps.value ? '运行中' : '已停止'"
          />
        </template>
        <template #qrcode>
          <div class="flex-col-center">
            <img :src="addr_qrcode" alt="qrcode" v-show="addr_qrcode" />
          </div>
        </template>
      </BaseForm>
    </Card>
  </Page>
</template>
