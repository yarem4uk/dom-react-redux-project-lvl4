import React, { useEffect } from 'react';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const chnlStyles = (current) => {
    return (idx) => {
      return cn('w-100', 'rounded-0', 'text-start', 'btn', {
        'btn-secondary': current === idx,
      });
    };
  };

  const btnStyles = chnlStyles(currentChannelId);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => {
        return (
          <li className="nav-item w-100" key={channel.id}>
            <button type="button" className={btnStyles(channel.id)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
