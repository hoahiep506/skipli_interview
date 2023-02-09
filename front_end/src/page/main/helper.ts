import { apiSearchUser } from 'api';
import { insertObjectIf } from 'helper';
import { useCallback, useEffect, useRef, useState } from 'react';

export type TGithubUser = {
  id: string;
  login?: string;
  avatar_url?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
};

export const useApiSearchUser = () => {
  const [params, setParams] = useState({ q: '', page: 1, perPage: 20 });
  const [data, setData] = useState([] as TGithubUser[]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const paramsRef = useRef(params);
  paramsRef.current = params;

  useEffect(() => {
    if (params.q?.length > 0) {
      setLoading(true);
      apiSearchUser(params)
        .then((res) => {
          setData(res.data.items);
          setTotal(res.data.total_count);
        })
        .finally(() => setLoading(false));
    } else {
      setData([]);
      setTotal(0);
    }
  }, [params]);

  let timerId: any = null;

  const onSearch = useCallback((e: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const q = e.target.value;
      setParams({
        ...paramsRef.current,
        q,
        ...insertObjectIf(!q.length, { page: 1 }),
      });
    }, 500);
  }, []);

  const onChangePage = useCallback((page: number) => {
    setParams({ ...paramsRef.current, page });
  }, []);

  const onChangeSize = useCallback((perPage: number) => {
    setParams({ ...paramsRef.current, perPage });
  }, []);

  return {
    data,
    loading,
    params,
    total,
    setParams,
    onSearch,
    onChangePage,
    onChangeSize,
  };
};

export const getVisiblePages = (page: number, total: number) => {
  if (total < 7) {
    return [1, 2, 3, 4, 5, 6].filter((item) => item <= total);
  }
  if (page % 3 >= 0 && page > 2 && page + 2 < total) {
    return [1, page - 1, page, page + 1, total];
  }
  if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
    return [1, total - 3, total - 2, total - 1, total];
  }
  return [1, 2, 3, total - 1, total];
};
