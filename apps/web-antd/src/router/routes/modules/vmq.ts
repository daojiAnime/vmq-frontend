import type { RouteRecordRaw } from 'vue-router';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:shopping-cart',
      order: 2001,
      title: $t('vmq.menu.orders'),
    },
    name: 'VmqOrders',
    path: '/vmq-orders',
    component: () => import('#/views/vmq/orders/index.vue'),
  },
  {
    meta: {
      icon: 'lucide:monitor',
      order: 2002,
      title: $t('vmq.menu.monitor'),
    },
    name: 'VmqMonitor',
    path: '/vmq-monitor',
    component: () => import('#/views/vmq/monitor/index.vue'),
  },
  {
    meta: {
      icon: 'lucide:settings',
      order: 2003,
      title: $t('vmq.menu.settings'),
    },
    name: 'VmqSettings',
    path: '/vmq-settings',
    component: () => import('#/views/vmq/settings/index.vue'),
  },
  {
    meta: {
      icon: 'lucide:circle-help',
      keepAlive: true,
      order: 2004,
      title: $t('vmq.menu.help'),
      iframeSrc: 'https://vmq-docs.daojichang.eu.org/',
    },
    name: 'VmqHelp',
    path: '/vmq-help',
    component: IFrameView,
  },
];

export default routes;
