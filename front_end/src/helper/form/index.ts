import { isNilOrEmpty, isString } from 'ramda-adjunct';

export const trimValues = <P>(values: P): P => {
  if (isNilOrEmpty(values)) return values;
  const newValues = { ...values } as any;
  for (const key in newValues) {
    if (isString(newValues[key])) {
      newValues[key] = newValues[key].trim();
    }
  }
  return newValues;
};
