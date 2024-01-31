import {
  type UnwrapRef,
  computed,
  getCurrentInstance,
  reactive,
  ref,
  watch,
} from 'vue';

type IValueTypes = null | string | Date | object | boolean;

interface IOptions<T extends IValueTypes> {
  value: T;
  error?: string;
  validator?(d: UnwrapRef<T>): boolean;
  formater?(d: UnwrapRef<T>): UnwrapRef<T>;
}

// interface IOptions<T extends IValueTypes> {
//   value: T;
//   error?: string;
//   validator?(d: T): boolean;
//   formater?(d: T): T;
// }

export function createField<T extends IValueTypes>(
  options: IOptions<T>,
) {
  const data = reactive({
    value: options.value,
    error: options.error ?? '',
    isValid: false,
  });

  let formater = (d: UnwrapRef<T>) => d;
  let validator = (d: UnwrapRef<T>) => true;

  if ('formater' in options && typeof options.formater === 'function') {
    formater = options.formater;
  }

  if ('validator' in options && typeof options.validator === 'function') {
    validator = options.validator;
  }

  watch(
    () => data.value,
    (newValue) => {
      const formated = formater(newValue);

      if (!validator(formated)) {
        data.isValid = false;
        data.error = 'Error';
      } else {
        data.isValid = true;
        data.error = '';
      }

      data.value = formated;
    },
  );

  return data;
}

export function createFieldDate() {
  return createField<null | Date>({ value: null });
}

export function createFieldString() {
  return createField<string>({ value: '' });
}

export function createFieldBoolean() {
  return createField<boolean>({ value: false });
}

export type ICreateField<T extends IValueTypes = IValueTypes> = ReturnType<typeof createField<T>>;

/*
--- USAGE ---

const name = createField<string>({
  value: '',
  validator: (v) => v.length > 2 && v.length < 8,
});
--- OR ---
const name = createFieldString();

const date = createField<null | Date>({
  value: null,
  validator: (v) => {
    if (v instanceof Date) {
      return (v.getTime() > (new Date()).getTime());
    }
    return false;
  },
});
--- OR ---
const date = createFieldDate()

--- IN TEMPLATE ---
<SbField
  v-model="name.value"
  :is-error="!name.isValid"
  :desc="name.error"
/>

<SbFormItem
  :is-error="!date.isValid"
  :desc="date.error"
>
  <SbDatePicker v-model="date.value" />
</SbFormItem>

<SbButton :disabled="!name.isValid || !date.isValid">
  Submit
</SbButton>
*/
