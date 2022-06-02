import React, { useState } from 'react';
import type { FC } from 'react';
import { createItem, deleteById, Item, Items } from '../api';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../query/queryKey';

type ListProps = {
  listData: Items | undefined;
};
const List: FC<ListProps> = ({ listData }) => {
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState(false);
  const [menuInputVal, setMenuInputVal] = useState<string>('');
  const [priceInputVal, setPriceInputVal] = useState<number>(0);
  const [clickedId, setClickedId] = useState<string>('');
  const deleteItem = useMutation((id: string) => deleteById(id), {
    onSuccess: (data) => {
      console.log(data);
      console.log('성공한거야 ');
      queryClient.invalidateQueries(queryKeys.items);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editItem = useMutation((item: Item) => createItem(item), {
    onSuccess: (data) => {
      console.log(data);
      setEditable(!editable);
      queryClient.invalidateQueries(queryKeys.items);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id: string) => {
    deleteItem.mutate(id);
  };
  const handleEdit = (id: string, name: string, price: number) => {
    setEditable(true);
    setClickedId(id);
    setMenuInputVal(name);
    setPriceInputVal(price);
    const editObj = {
      id: clickedId,
      name: menuInputVal,
      price: priceInputVal,
    };
    editItem.mutate(editObj);
  };

  return (
    <div>
      {listData?.Items.map(({ id, price, name }) => (
        <ul key={id}>
          <li>id : {id}</li>
          {editable && clickedId === id ? (
            <div>
              <label>
                메뉴 이름 :
                <input
                  value={menuInputVal}
                  placeholder="수정할 메뉴 이름을 입력해주세요"
                  onChange={(e) => setMenuInputVal(e.target.value)}
                />
              </label>
              <label>
                가격 :
                <input
                  value={priceInputVal}
                  type="number"
                  placeholder="수정할 가격을 입력해주세요"
                  onChange={(e) => setPriceInputVal(parseInt(e.target.value))}
                />
              </label>
            </div>
          ) : (
            <div>
              <li>메뉴 이름 : {name}</li>
              <li>가격: {price} 원</li>
            </div>
          )}

          <button onClick={() => handleDelete(id)}>삭제하기</button>
          <button onClick={() => handleEdit(id, name, price)}>
            {editable && clickedId === id ? (
              <span>제출하기</span>
            ) : (
              <span>수정하기</span>
            )}
          </button>
        </ul>
      ))}
    </div>
  );
};

export default List;
