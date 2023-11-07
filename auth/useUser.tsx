import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { QUERY_KEY } from '../constants/queryKeys';
import { ResponseError } from '../utils/Errors/ResponseError';
import * as userLocalStorage from './user.localstore';

import { GraphQLClient } from 'graphql-request';
import { CUR_USER_QUERY } from '@/graphql';

async function getUser(): Promise<User | null> {
  const token = localStorage.getItem('token');
  const client = new GraphQLClient('http://localhost:4200/graphql', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const data: any = await client.request(CUR_USER_QUERY);
    // console.log(data.getCurUser, '+++++');
    return data.getCurUser;
  } catch (error: any) {
    throw new ResponseError('Failed to get user', error);
  }
}

export interface User {
  _id: number;
  name: string;
  email: string;
}

interface IUseUser {
  user: User | null;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>(
    [QUERY_KEY.user],
    async () => getUser(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser(),
      onError: () => {
        userLocalStorage.removeUser();
      }
    }
  );

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}