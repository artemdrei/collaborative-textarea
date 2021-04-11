import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Editor from '@root/containers/Pages/Editor';

import s from './styles.scss';

const App: React.FC = () => (
  <div className={s.app}>
    <Switch>
      <Route path="/" component={Editor} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
