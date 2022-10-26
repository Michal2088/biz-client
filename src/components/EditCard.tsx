import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { editCard, getCard } from "../services/cardsService";
import { Card } from "../interfaces/Card";
import Footer from "./Footer";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
  const {id} = useParams();
  console.log(id);
  
  const [card, setCard] = useState({
    bizName: "",
    bizAddress: "",
    bizDescription: " ",
    bizPhone: "",
    bizImage: "",
  });
  useEffect(() => {
    getCard(id as string)
      .then((result) => setCard(result.data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        bizName: card.bizName,
        bizAddress: card.bizAddress,
        bizDescription: card.bizDescription,
        bizPhone: card.bizPhone,
        bizImage: card.bizImage,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
        bizName: Yup.string().required().min(2),
        bizAddress: Yup.string().required().min(2),
        bizDescription: Yup.string().required().min(2),
        bizPhone: Yup.string().required(),
        bizImage: Yup.string().required(),
      }),
    onSubmit: (values:Card, { resetForm }) => {
      let card = { ...values, _id: id as string };
      editCard(card)
        .then((result) => {
          successMsg("Card edit successfully");
          navigate("/MyCards");
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
      <form onSubmit={formik.handleSubmit} className="m-5 w-25 mx-auto">
        <h3 className="text-center display-5">Edit Card</h3>
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
        <p className="text-center mt-3">
          <Link to={"/MyCards"}>back to my cards</Link>
        </p>
        <button
          type="submit"
          className="btn btn-secondary w-100 mt-3"
          disabled={!(formik.isValid && formik.dirty)}
        >
        up date card
        </button>
      </form>
      <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default EditCard;
