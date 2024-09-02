import { IActionsButton } from '@/types/components/actionButtons';
import ActionButtons from './ActionButtons';

interface IBreadcrumbsProps {
  pageTitle?: string;
  breadcrumbsActionsButtons?: IActionsButton[];
}

export default function Breadcrumbs({
  pageTitle: propsPageTitle,
  breadcrumbsActionsButtons,
}: IBreadcrumbsProps) {
  return (
    <section>
      <div className='flex items-center justify-between max-w-full overflow-x-auto sm:flex-nowrap pt-6 pb-4 px-0 gap-y-1 gap-x-8'>
        <nav className='' aria-label={`Breadcrumb`}>
          <h1 className='text-xl font-medium text-black capitalize md:text-[22px]'>
            {propsPageTitle}
          </h1>
        </nav>

        {/* action buttons */}
        {breadcrumbsActionsButtons && (
          <ActionButtons actionButtons={breadcrumbsActionsButtons} />
        )}
      </div>
    </section>
  );
}
