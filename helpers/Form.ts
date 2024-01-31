import type { ComputedRef, UnwrapNestedRefs } from 'vue';
import { computed, reactive } from 'vue';

import type { ICreateField } from '@/model/tools/Field';
import {
  createFieldBoolean,
  createFieldDate,
  createFieldString,
} from '@/model/tools/Field';

type IOption = {
  [key: string]: 'string' | 'date' | 'boolean' | ICreateField;
};

type ICreateForm<T extends IOption> = {
  [K in keyof T]: T[K] extends 'string'
    ? ICreateField<string>
    : T[K] extends 'date'
    ? ICreateField<Date | null>
    : T[K] extends 'boolean'
    ? ICreateField<boolean>
    : T[K] extends ICreateField<infer U>
    ? ICreateField<U>
    : never;
};

export function createForm<T extends IOption>(
  options: T,
): UnwrapNestedRefs<ICreateForm<T>> & {
  isValid: boolean;
} {
  const formKeys = Object.keys(options) as (keyof T)[];
  const form: ICreateForm<T> = {} as ICreateForm<T>;

  formKeys.forEach((key) => {
    const link = options[key];

    if (typeof link !== 'string') {
      form[key] = link;
    } else if (link === 'date') {
      form[key] = createFieldDate();
    } else if (link === 'boolean') {
      form[key] = createFieldBoolean();
    } else {
      form[key] = createFieldString();
    }
  });

  return {
    form,
    isValid: computed(() => formKeys.every((key) => form[key].isValid)),
  };
}
