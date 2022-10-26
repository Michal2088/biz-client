import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as Yup from "yup";
import { User } from "../interfaces/User";
import { checkUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values: User, { resetForm }) => {
      checkUser(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("you logged in successfully");
          navigate("/");
        })
        .catch((err) => {
          resetForm();
          errorMsg(err.response.data);
          
          
        });
    },
  });


  return (
    <div className="container d-flex flex-column min-vh-100">
      <Navbar/>
      <form onSubmit={formik.handleSubmit} className="m-5 w-50 mx-auto">
        <h3 className="text-center display-5">Sign in</h3>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            name="email"
            value={formik.values.email}
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-danger"> {formik.errors.password}</p>
        ) : null}
        <button
          type="submit"
          className="btn btn-secondary w-100 mt-3"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Sign in
        </button>
        <p className="text-center mt-3">
          <Link to={"/register"}>New in Biz,Sign up here</Link>
        </p>
      </form>
      <div className="mt-auto">
          <Footer />
        </div>
    </div>
  );
};

export default Login;
