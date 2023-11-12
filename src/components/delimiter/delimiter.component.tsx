import { FC } from 'react';

import clsx from 'clsx';

import { DelimiterProps } from './delimiter.types.ts';

import './delimiter.scss';


const Delimiter: FC<DelimiterProps> = ({
  variant, v, h,
  type, micro, tiny, wide, tall, tall2, tall3,
  visible,
  ...rest
}) => {
  const delimiterVariant = variant || !type && !h && !v && 'v' || { h, v };

  return (
    <div
      className={clsx('delimiter', {
        visible,
        micro,
        tiny,
        wide,
        tall,
        tall2,
        tall3
      }, type, delimiterVariant)}
      {...rest}
    ></div>
  );
};

export default Delimiter;
