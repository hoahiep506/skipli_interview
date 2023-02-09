import { Img } from 'assets';
import { memo, useMemo } from 'react';

type TAvatarProps = {
  size?: 'small' | 'medium' | 'large';
  url?: string;
};

const Avatar = (props: TAvatarProps) => {
  const { size = 'medium' } = props;
  const finalSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 'h-8 w-8';
      case 'medium':
        return 'h-12 w-12';
      case 'large':
        return 'h-16 w-16';
      default:
        return 'h-12 w-12';
    }
  }, [size]);
  return (
    <img
      src={props.url || Img.avatar}
      className={`rounded-full object-cover ${finalSize}`}
    ></img>
  );
};

export default memo(Avatar);
