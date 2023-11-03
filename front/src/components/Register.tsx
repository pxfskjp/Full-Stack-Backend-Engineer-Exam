import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /['0-9']/g;
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must contains at least one lower character, one upper character, one digit character, one special character and at least 8 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.match(lowerCaseLetters) &&
          val.match(upperCaseLetters) &&
          val.match(specialCharacters) &&
          val.match(numbers)

      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;
    if (username && email && password) {
      register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="grid justify-items-center content-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          {!successful && (
            <div className="flex flex-col justify-center items-center">
              <div className="my-4">
                <Field name="username" type="text" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="my-4">
                <Field name="email" type="email" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="my-4">
                <Field
                  name="password"
                  type="password"
                  className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="w-[384px] text-white text-sm"
                />
              </div>
              
                <button type="submit" className="py-2 px-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-full text-center">Sign Up</button>

                <button type="button" className="py-2 px-4 mt-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-full text-center">Sign Up with Google</button>

                <a href="/login" className="py-2 px-4 mt-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-full text-center">
                  <span>To Login</span>
                </a>
            </div>
          )}

          {message && (
            <div className="my-4">
              <div className="text-white text-sm">
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
