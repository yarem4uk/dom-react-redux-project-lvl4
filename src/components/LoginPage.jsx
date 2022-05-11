import axios from 'axios';

import React, { useEffect, useRef } from 'react';
import SignupForm from './SignupForm.jsx';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

import * as Yup from 'yup';

import routes from '../routes.js';

const LoginPage = () => {
  // const inputRef = useRef();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const validationShema = Yup.object({
    username: Yup.string().required('is required'),
    password: Yup.string().required('is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationShema,
    onSubmit: async ({ username, password }) => {
      const { data } = await axios.post(routes.loginPath(), {
        username,
        password,
      });
      const { token } = data;
      console.log(token);
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
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="Ваш ник"
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Пароль</Form.Label>
                <Form.Control
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
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
