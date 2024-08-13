import { DropdownDirection } from '../../../types/ui';
import * as cl from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.optionsBottomLeft,
  'bottom right': cl.optionsBottomRight,
  'top right': cl.optionsTopRight,
  'top left': cl.optionsTopLeft,
};
