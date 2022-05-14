import React, { useEffect } from 'react';
// import cn from 'classnames';

// import { useSelector, useDispatch } from 'react-redux';

import Channels from './Channels.jsx';

const ChatPage = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchChannels());
  // }, [dispatch]);

  // const { channels, currentChannelId } = useSelector((state) => state.channels);

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
              <div className="text-break mb-2">
                <b>Zyrael</b>: hello
              </div>
            </div>
            <div>form</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
