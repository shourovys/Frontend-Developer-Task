import {
  faArrowRightToBracket,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const createIcon = faPlus;
export const exportIcon = faArrowRightToBracket;

// icon component and type
const Icon = FontAwesomeIcon;
export type TIcon = IconDefinition;

export default Icon;
