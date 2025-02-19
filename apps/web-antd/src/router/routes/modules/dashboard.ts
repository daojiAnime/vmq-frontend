import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  // {
  //   meta: {
  //     icon: 'lucide:layout-dashboard',
  //     order: -1,
  //     title: $t('page.dashboard.title'),
  //   },
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   component: () => import('#/views/dashboard/index.vue'),
  //   children: [
  //     {
  //       name: 'Analytics',
  //       path: '/analytics',
  //       component: () => import('#/views/dashboard/analytics/index.vue'),
  //       meta: {
  //         affixTab: true,
  //         icon: 'lucide:area-chart',
  //         title: $t('page.dashboard.analytics'),
  //       },
  //     },
  //     {
  //       name: 'Workspace',
  //       path: '/workspace',
  //       component: () => import('#/views/dashboard/workspace/index.vue'),
  //       meta: {
  //         icon: 'carbon:workspace',
  //         title: $t('page.dashboard.workspace'),
  //       },
  //     },
  //   ],
  // },
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('vmq.menu.dashboard'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('#/views/vmq/dashboard/index.vue'),
  },
];

export default routes;
