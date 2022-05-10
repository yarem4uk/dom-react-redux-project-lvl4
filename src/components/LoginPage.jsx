import React, { useEffect, useRef } from 'react';
import SignupForm from './SignupForm.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    onSubmit: (values) => {
      console.log('>>>>> submit', values);
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form
              className="col-12 col-md-6 mt-3 mt-mb-0"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <input
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="Ваш ник"
                  id="username"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <label htmlFor="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  onChange={formik.handleChange}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Пароль"
                  type="password"
                  id="password"
                  className="form-control"
                  value={formik.values.password}
                />
                <label className="form-label" htmlFor="password">
                  Пароль
                </label>
              </div>
              <button
                type="submit"
                className="w-100 mb-3 btn btn-outline-primary"
              >
                Войти
              </button>
            </form>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
