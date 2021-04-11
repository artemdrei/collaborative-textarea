import React from 'react';

import labels from '@root/i18n';

import s from './styles.scss';

const Header = () => (
  <div className={s.header}>
    <h1 className={s.title}>{labels.pages.editor.title}</h1>
  </div>
);

export default Header;
