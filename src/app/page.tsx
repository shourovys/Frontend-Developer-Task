'use client';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { IActionsButton } from '@/types/actionButtons';
import { createIcon, exportIcon } from '@/utils/icons';

export default function Home() {
  // Define the actions for the breadcrumbs bar
  const breadcrumbsActionsButtons: IActionsButton[] = [
    {
      color: 'outline',
      icon: exportIcon,
      iconClass: '-rotate-90',
      text: 'Export',
      onClick: () => {},
    },
    {
      color: 'primary',
      icon: createIcon,
      text: 'Create Order',
      onClick: () => {},
    },
  ];
  return (
    <div>
      <Breadcrumbs
        pageTitle='Orders'
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />

      <h1 className='text-3xl font-bold underline  '>Hello world!</h1>
    </div>
  );
}
