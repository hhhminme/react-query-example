import axios from 'axios';

export type Item = {
  id: string;
  name: string;
  price: number;
};
export type Items = {
  Count: number;
  Items: Item[];
  ScannedCount: number;
};

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const getItemAll = async () => {
  const { data } = await apiClient.get<Items>('/items');
  return data;
};

export const getItemById = async (id: any) => {
  const response = await apiClient.get<Item>(`/items/$${id}`);
  return response.data;
};

export const createItem = async ({ id, name, price }: Item) => {
  const response = await apiClient.put('/items', {
    price,
    name,
    id,
  });
  return response.data;
};

export const deleteById = async (id: string) => {
  const response = await apiClient.delete(`/items/${id}`);
  return response.data;
};
