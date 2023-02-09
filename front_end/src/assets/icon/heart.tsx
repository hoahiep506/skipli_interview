import { SVGProps, memo } from 'react';

const IconHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className='style_saved__kYktV'
    width={21}
    height={21}
    viewBox='0 0 24 24'
    fill='none'
    stroke='#8899a4'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
  </svg>
);

const Memo = memo(IconHeart);
export default Memo;
