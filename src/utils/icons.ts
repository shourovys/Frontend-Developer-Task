import {
  faArrowRightToBracket,
  faCalendarAlt,
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

// icon component and type
const Icon = FontAwesomeIcon;
export type TIcon = IconDefinition;

export default Icon;
