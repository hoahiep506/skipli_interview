export const insertObjectIf = <T1 extends object>(
  condition: boolean,
  elements1: T1
): Partial<T1> => {
  const temps: unknown = {};
  return condition ? elements1 : ({} as Partial<T1>);
};
