import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { createItem, Item } from '../api';
import { queryKeys } from '../query/queryKey';

interface IFormInput {
  name: string;
  price: number;
}

const Form = () => {
  const queryClient = useQueryClient();
  const addItem = useMutation((item: Item) => createItem(item), {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(queryKeys.items);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const Item = {
      id: uuidv4(),
    };
    const newItem = Object.assign(Item, data);
    addItem.mutate(newItem);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        메뉴 이름
        <input
          type="text"
          placeholder="메뉴이름을 작성해주세요"
          {...register('name')}
        />
      </label>
      <label>
        메뉴 가격
        <input
          type="number"
          placeholder="메뉴 가격을 작성해주세요"
          {...register('price')}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Form;
