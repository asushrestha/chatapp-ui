import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

import { login } from "../slice/auth/authSlice";
// import { clearMessage } from "../slice/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  const initialValues = {
    userName: "",
    password: "",
  };

  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().required("This field is required!"),
  //   password: Yup.string().required("This field is required!"),
  // });

  const handleLogin = (formValue) => {
    const { userName, password } = formValue;

    dispatch( login({ userName, password }))
      .unwrap()
      .then(() => {
        navigate("/list-all");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
      });
  };


  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <Field name="userName" type="text" className="form-control" />
              <ErrorMessage
                name="userName"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Login;


