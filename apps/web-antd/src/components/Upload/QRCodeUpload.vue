<script setup lang="ts">
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload';

import { ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { useAccessStore } from '@vben/stores';

import { Button, message, Upload } from 'ant-design-vue';

interface Props {
  size?: 'large' | 'middle' | 'small';
  type?: 'alipay' | 'wechat';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'middle',
  type: 'wechat',
});

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const modelValue = defineModel({ default: '', type: String });

const fileList = ref<UploadFile[]>([]);

const accessStore = useAccessStore();

const handleChange = (info: UploadChangeParam) => {
  // if (info.file.status !== 'uploading') {
  //   // eslint-disable-next-line no-console
  //   console.log(info.file, info.fileList);
  // }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 上传成功`);
    modelValue.value = info.file.response.data?.wechat_qrcode || '';
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败`);
  }
};

defineExpose({});
</script>
<template>
  <Upload
    v-model:file-list="fileList"
    :max-count="1"
    @change="handleChange"
    :action="`${apiURL}/settings/qrcode?${props.type}`"
    :headers="{
      Authorization: `Bearer ${accessStore.accessToken}`,
    }"
  >
    <Button :size="props.size">
      <span class="icon-[ant-design--upload-outlined]"></span>
      上传收款码
    </Button>
  </Upload>
</template>
