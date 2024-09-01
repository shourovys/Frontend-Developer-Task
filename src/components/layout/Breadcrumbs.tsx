import { TIcon } from '@/utils/icons';
import { TButtonColor, TButtonSize } from '../atomic/Button';
import ActionButtons from './ActionButtons';

interface IActionButtonBase {
  color?: TButtonColor;
  icon?: TIcon;
  text: string;
  iconClass?: string;
  isLoading?: boolean;
  size?: TButtonSize;
  disabled?: boolean;
}

export interface IActionsButtonWithOnClick extends IActionButtonBase {
  link?: never;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IActionsButtonWithLink extends IActionButtonBase {
  link: string;
  onClick?: never;
}
export type IActionsButton = IActionsButtonWithOnClick | IActionsButtonWithLink;

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
