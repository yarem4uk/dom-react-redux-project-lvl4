import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import SignupForm from './SignupForm.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [authFaild, setAuthFaild] = useState(false);

  // const validationShema = Yup.object({
  //   cpusername: Yup.string().required('is required'),
  //   password: Yup.string().required('is required'),
  // });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validationShema,
    onSubmit: async ({ username, password }) => {
      setAuthFaild(false);
      try {
        const { data } = await axios.post(routes.loginPath(), {
          username,
          password,
        });
        const { token } = data;
        localStorage.setItem('userId', JSON.stringify(token));
        auth.logIn();
        const path = '/';
        navigate(path);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFaild(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <Form className="p-3" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Ваш ник</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Ваш ник"
                  autoComplete="username"
                  name="username"
                  id="username"
                  isInvalid={authFaild}
                  required
                  ref={inputRef}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Пароль</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Пароль"
                  autoComplete="current-password"
                  name="password"
                  id="password"
                  isInvalid={authFaild}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Неверные имя пользователя или пароль
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Войти
              </Button>
            </Form>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
