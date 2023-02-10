import { apiGetUser, apiLikeUser } from 'api';
import { IconHeart } from 'assets';
import { insertObjectIf } from 'helper';
import { TGithubUser } from 'page/main/helper';
import { isString } from 'ramda-adjunct';
import { memo, useCallback, useState } from 'react';

type TButtonLikeProps = {
  githubUserId: string;
};

const ButtonLike = (props: TButtonLikeProps) => {
  const favoriteGithubUser = JSON.parse(
    localStorage.getItem('favoriteGithubUser') || '[]'
  );

  const [isLiked, setIsLiked] = useState(
    favoriteGithubUser.some(
      (githubProfile: TGithubUser) => githubProfile?.id === props.githubUserId
    )
  );

  const handleLike = useCallback(() => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (isString(phoneNumber)) {
      apiLikeUser({
        githubUserId: props.githubUserId.toString(),
        phoneNumber,
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLiked((prev: boolean) => {
              return !prev;
            });
          }
        })
        .finally(() => {
          apiGetUser({ phoneNumber }).then((res) => {
            if (res.status === 200) {
              localStorage.setItem(
                'favoriteGithubUser',
                JSON.stringify(res.data?.favoriteGithubUser)
              );
            }
          });
        });
    }
  }, [setIsLiked]);

  return (
    <IconHeart
      className='cursor-pointer'
      {...insertObjectIf(isLiked, { fill: 'violet' })}
      onClick={handleLike}
    />
  );
};

export default memo(ButtonLike);
