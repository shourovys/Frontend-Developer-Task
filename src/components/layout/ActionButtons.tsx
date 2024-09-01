import { cn } from '@/lib/utils';
import { IActionsButton } from '@/types/actionButtons';
import Icon from '@/utils/icons';
import Button from '../atomic/Button';

interface IProps {
  actionButtons: IActionsButton[];
}
function ActionButtons({ actionButtons }: IProps) {
  return (
    <div className='flex gap-x-2.5 '>
      {actionButtons.map((button) => (
        <Button
          color={button.color || 'primary'}
          key={button.text}
          size={button.size}
          link={button.link}
          onClick={button.onClick}
          isLoading={button.isLoading}
          disabled={button.disabled}
          className='w-fit'
        >
          <>
            {button.icon && (
              <Icon
                icon={button.icon}
                className={cn('h-4 w-4', button.iconClass)}
              />
            )}
            <span>{button.text}</span>
          </>
        </Button>
      ))}
    </div>
  );
}

export default ActionButtons;
