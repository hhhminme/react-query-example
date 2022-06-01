export const queryKeys = {
  items: ['items'] as const,
  createItem: (id: string, name: string, price: number) =>
    ['createItem', id, name, price] as const,
};
