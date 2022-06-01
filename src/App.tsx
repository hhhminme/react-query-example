import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getItemAll } from './api';
import Form from './components/Form';
import List from './components/List';
import { queryKeys } from './query/queryKey';

const App = () => {
  const { data, status } = useQuery(queryKeys.items, getItemAll);

  return (
    <div>
      <h1>메뉴 등록하기</h1>
      <Form />
      <div>나의 메뉴판 정보</div>
      {status === 'loading' ? (
        <span>로딩 중 입니다...</span>
      ) : (
        <List listData={data} />
      )}
    </div>
  );
};

export default App;
