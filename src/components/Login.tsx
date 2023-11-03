import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";

type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Input username!"),
    password: Yup.string().required("Input Password!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="grid justify-items-center content-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="my-4">
            <Field name="username" type="text" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Username" />
            <ErrorMessage
              name="username"
              component="div"
              className="text-white text-sm"
            />
          </div>

          <div className="my-4">
            <Field name="password" type="password" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-white text-sm"
            />
          </div>

          <div className="flex gap-8 my-4 justify-center">
            <button type="submit" className="py-2 px-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-36 text-center" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>


            <a href="/register" className="py-2 px-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-36 text-center">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </a>
          </div>

          {message && (
            <div className="grid justify-items-center">
              <div className="text-white text-sm" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
