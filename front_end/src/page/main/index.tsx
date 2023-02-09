import { Avatar, Button, ButtonLike, InputText } from 'component';
import { insertObjectIf } from 'helper';
import { TGithubUser, getVisiblePages, useApiSearchUser } from './helper';

const MainPage = () => {
  const helper = useApiSearchUser();

  return (
    <div className='w-full h-full overflow-auto relative'>
      <div className='nav-bar flex gap-3 items-center justify-end'>
        <InputText containerClassName='w-60' onChange={helper.onSearch} />
        <Avatar size='small' />
      </div>
      <section className='w-full min-h-screen text-white'>
        <div className='grid grid-cols-1 gap-6 p-6 lg:gap-8 lg:p-8 sm:grid-cols-2 lg:grid-cols-3'>
          {helper.data?.map((user: TGithubUser) => {
            return (
              <div className='relative flex bg-slate-50 rounded-lg p-4 gap-3 dark:bg-slate-800 dark:highlight-white/5'>
                <div className='flex flex-col items-center gap-3'>
                  <Avatar size='medium' url={user.avatar_url} />
                  <ButtonLike githubUserId={user.id} />
                </div>

                <div>
                  <h1 className='text-xl truncate'>{user.login}</h1>
                  <p className='text-sm font-thin'>ID:{user.id}</p>
                  <a
                    className='text-sm font-thin truncate'
                    href={user.html_url}
                    target='blank'
                  >
                    {user.html_url}
                  </a>
                  <p className='text-sm font-thin'>
                    Public_repos: {user.public_repos || 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className='bottom-bar h-[58px] flex gap-3 items-center justify-center'>
        {getVisiblePages(helper.params.page, helper.total).map((page) => (
          <Button
            label={page}
            onClick={() => helper.onChangePage(page)}
            {...insertObjectIf(page === helper.params.page, {
              containerClassName: 'bg-violet-900',
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
