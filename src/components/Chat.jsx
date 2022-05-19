import React, { useEffect } from 'react';
// import cn from 'classnames';
import { io } from 'socket.io-client';

import Channels from './Channels.jsx';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';

import { useSelector, useDispatch } from 'react-redux';

import { fetchChannels } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const domain = 'http://localhost:5000';
const socket = io(domain);

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  socket.on('newMessage', (data) => {
    console.log('socket io');
    dispatch(messagesActions.addMessage(data));
  });

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const currentChannel = channels.find((item) => item.id === currentChannelId);
  console.log(currentChannel, 'currentChannel');

  console.log(messages, 'chat');

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
            >
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">362 сообщения</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messages.map(({ id, body, channelId, username }) => {
                return channelId === currentChannelId ? (
                  <Message key={id} body={body} username={username} />
                ) : null;
              })}
            </div>
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
