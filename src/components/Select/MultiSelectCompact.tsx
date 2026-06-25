import { CheckboxSelect, type CheckboxSelectProps } from './CheckboxSelect';
import type { SelectOption } from './types';

export type MultiSelectCompactProps<
  Option extends SelectOption = SelectOption,
> = Omit<CheckboxSelectProps<Option, true>, 'compactDisplay' | 'isMulti'>;

export const MultiSelectCompact = <Option extends SelectOption = SelectOption>(
  props: MultiSelectCompactProps<Option>,
) => {
  return <CheckboxSelect<Option, true> {...props} compactDisplay isMulti />;
};
