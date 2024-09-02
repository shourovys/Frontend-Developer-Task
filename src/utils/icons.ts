import {
  faArrowDownLong,
  faArrowRightToBracket,
  faArrowUpLong,
  faCalendarAlt,
  faCheck,
  faCopy,
  faEllipsis,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const createIcon = faPlus;
export const exportIcon = faArrowRightToBracket;
export const calendarIcon = faCalendarAlt;
export const searchIcon = faMagnifyingGlass;
export const filterIcon = faFilter;

export const copyIcon = faCopy;
export const checkIcon = faCheck;
export const threeDotsIcon = faEllipsis;
export const plusIcon = faPlus;

export const downArrowIcon = faArrowDownLong; // for table header sort desc
export const upArrowIcon = faArrowUpLong; // for table header sort asc

// icon component and type
const Icon = FontAwesomeIcon;
export type TIcon = IconDefinition;

export default Icon;
