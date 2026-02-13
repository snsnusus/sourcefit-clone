import defaultTo from 'lodash/defaultTo';
import get from 'lodash/get';

export const getOption =
  <Type extends object>(
    path: keyof Type | 'value' | 'label'
  ): ((option: Type) => string) =>
  (option: Type) =>
    defaultTo(get(option, path), '');
