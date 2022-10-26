import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { addUser } from "../services/usersService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface RegisterProps {
  biz: boolean;
  text: string;
  img: string;
}

const Register: FunctionComponent<RegisterProps> = ({ biz, text, img }) => {
  const navigate = useNavigate();
  const formik:any = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, "Must be 2 characters or more"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let user: User = { ...values, biz: biz };
      addUser(user)
        .then((result) => {
          console.log(result.data);
          sessionStorage.setItem("token", result.data.token);
          successMsg("you register successfully");
          if (biz) {
            navigate("/NewCard");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          errorMsg(err.response.data);
          resetForm();
        });
    },
  });
  return (
    <>
     <div className="container d-flex flex-column min-vh-100">
        <Navbar />

        <div className="row mt-5 border">
          <div className="col col-lg-5">
            <form onSubmit={formik.handleSubmit} className="m-5 mx-auto">
              <h3 className="text-center display-5">Sign up</h3>
              <p className="text-center">Create {text} account for free!</p>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingEmail">Name</label>
              </div>
              {formik.touched.name && formik.errors.name ? (
                <p className="text-danger">{formik.errors.name}</p>
              ) : null}
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
                Sign up
              </button>
              <p className="text-center mt-3">
                <Link to={"/login"}>Already have user,Sign in</Link>
              </p>
            </form>
          </div>
          
          <img className="col col-lg-7" src={img} />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Register;
