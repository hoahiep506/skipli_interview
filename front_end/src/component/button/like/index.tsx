import { apiLikeUser } from 'api';
import { IconHeart } from 'assets';
import { insertObjectIf } from 'helper';
import { isString } from 'ramda-adjunct';
import { memo, useCallback, useState } from 'react';

type TButtonLikeProps = {
  githubUserId: string;
};

const ButtonLike = (props: TButtonLikeProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (isString(phoneNumber)) {
      apiLikeUser({
        githubUserId: props.githubUserId.toString(),
        phoneNumber,
      }).then((res) => {
        if (res.status === 200) setIsLiked(!isLiked);
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
