import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Card } from "../interfaces/Card";
import { addCard } from "../services/cardsService";
import Footer from "./Footer";

interface NewCardProps {}

const NewCard: FunctionComponent<NewCardProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      bizName: "",
      bizAddress: "",
      bizDescription: " ",
      bizPhone: "",
      bizImage: "",
    },
    validationSchema: Yup.object().shape({
      bizName: Yup.string().required().min(2),
      bizAddress: Yup.string().required().min(2),
      bizDescription: Yup.string().required().min(2),
      bizPhone: Yup.string().required(),
      bizImage: Yup.string().required(),
    }),
    onSubmit: (values: Card, { resetForm }) => {
      addCard(values)
        .then(() => {
          successMsg("card add successfully");
          navigate("/AllCards");
        })
        .catch((err) => {
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
        <img className="col col-lg-7" src="images/F0_1200_0432_business-woman-holding-showing-empty-business-card-name-card(1).jpg" />

          <div className="col col-lg-5">
          <form onSubmit={formik.handleSubmit} className="m-5">
        <h3 className="text-center display-5">Add New Card</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            placeholder="bizName"
            name="bizName"
            value={formik.values.bizName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">BizName</label>
        </div>
        {formik.touched.bizName && formik.errors.bizName ? (
          <p className="text-danger">{formik.errors.bizName}</p>
        ) : null}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            placeholder="bizAddress"
            name="bizAddress"
            value={formik.values.bizAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">bizAddress</label>
        </div>
        {formik.touched.bizAddress && formik.errors.bizAddress ? (
          <p className="text-danger">{formik.errors.bizAddress}</p>
        ) : null}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            placeholder="bizDescription"
            name="bizDescription"
            value={formik.values.bizDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">bizDescription</label>
        </div>
        {formik.touched.bizDescription && formik.errors.bizDescription ? (
          <p className="text-danger">{formik.errors.bizDescription}</p>
        ) : null}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            placeholder="bizPhone"
            name="bizPhone"
            value={formik.values.bizPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">bizPhone</label>
        </div>
        {formik.touched.bizPhone && formik.errors.bizPhone ? (
          <p className="text-danger">{formik.errors.bizPhone}</p>
        ) : null}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            placeholder="bizImage"
            name="bizImage"
            value={formik.values.bizImage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">bizImage</label>
        </div>
        {formik.touched.bizImage && formik.errors.bizImage ? (
          <p className="text-danger">{formik.errors.bizImage}</p>
        ) : null}
        <button
          type="submit"
          className="btn btn-secondary w-100 mt-3"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Add Card
        </button>
        <p className="text-center mt-3">
          <Link to={"/AllCards"}>Back to all cards</Link>
        </p>
      </form>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NewCard;
