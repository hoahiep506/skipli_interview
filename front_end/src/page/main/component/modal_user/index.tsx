import { apiGetUser } from 'api';
import { Avatar, Modal } from 'component';
import { isString } from 'formik';
import { useApiGetUser } from 'hook';
import { useEffect } from 'react';

const ModalUser = () => {
  const { data, phoneNumber } = useApiGetUser();

  return (
    <div className='w-96 bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5 dark:ring-0 p-8'>
      <div className='flex flex-col text-white'>
        <div className='flex gap-3'>
          <Avatar size='large' />
          <div>
            <p>{phoneNumber}</p>
            <p>Total liked: {data.length}</p>
          </div>
        </div>
        <div className='max-h-96 overflow-auto mt-3'>
          {data.map((user) => {
            return (
              <div className='relative flex items-center bg-slate-50 rounded-lg gap-3 dark:bg-slate-800 dark:highlight-white/5 mb-2'>
                <Avatar size='small' url={user.avatar_url} />
                <p className='text-sm font-thin'>
                  Public_repos: {user.public_repos || 0}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
