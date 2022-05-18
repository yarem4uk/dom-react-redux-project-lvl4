import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { io } from 'socket.io-client';

import { useFormik } from 'formik';

import { Button, Form } from 'react-bootstrap';
import routes from '../routes.js';
import axios from 'axios';

const domain = 'http://localhost:5000';
const socket = io(domain);

const MessageForm = () => {
  const bodyRef = useRef();

  const { username } = JSON.parse(localStorage.getItem('user'));
  const { currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    bodyRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async () => {
      const message = {
        body: formik.values.body,
        username,
        channelId: currentChannelId,
      };
      await socket.emit('newMessage', message);
      formik.resetForm();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.body}
            placeholder="Введите сообщение..."
            name="body"
            aria-label="Новое сообщение"
            className="border-0 p-0 ps-2 form-control"
            ref={bodyRef}
          />
          <Button
            className="btn btn-light btn-group-vertical"
            type="submit"
            disabled=""
          >
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
