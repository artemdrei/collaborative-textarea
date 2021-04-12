import React, { useEffect, useRef } from 'react';

import sharedb from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';

import Header from '@root/components/Header';
import labels from '@root/i18n';
import socketLogger from './utils/socketLogger';

import s from './styles.scss';

const socket = new ReconnectingWebSocket('ws://localhost:5000');
const connection = new sharedb.Connection(socket);

const Editor: React.FC = () => {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = document.getElementById('#textarea');
    socketLogger(socket);

    const doc = connection.get('doc', 'textarea');
    doc.subscribe((err) => {
      if (err) throw new Error(err.message);

      const binding = new StringBinding(intervalRef.current, doc, ['content']);
      binding.setup();
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className={s.content}>
        <textarea className={s.textarea} id="#textarea" placeholder={labels.pages.editor.textareaPlaceholder} />
      </div>
    </div>
  );
};

export default Editor;
