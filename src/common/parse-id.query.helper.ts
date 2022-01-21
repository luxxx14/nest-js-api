export const parseIdQueryHelper = (id: string | object): number[] => {
  return typeof id === 'string' ? [Number(id)] : Object.values(id);
};
