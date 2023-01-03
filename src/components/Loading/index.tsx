import React from 'react';
import s from './loading.module.scss';

const Loading = () => {
  return (
    <div className={s.spinnerContainer}>
      <div></div>
    </div>
  );
};

export default Loading;