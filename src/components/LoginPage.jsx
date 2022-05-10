import React from 'react';
import SignupForm from './SignupForm.jsx';
import { useFormik } from 'formik';

const LoginPage = () => {
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <input
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="Ваш ник"
                  id="username"
                  className="form-control"
                  value=""
                />
                <label htmlFor="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Пароль"
                  type="password"
                  id="password"
                  className="form-control"
                  value=""
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
