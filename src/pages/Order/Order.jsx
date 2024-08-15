import React, { useEffect, useState } from "react";
import { fetchGetOrdersByUser } from "../../services/OrderService";
import { NumericFormat } from "react-number-format";
import { format as dateFormat } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { postView } from "../../services/ReviewService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";

const Order = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [orderId, setOrderId] = useState();
  const navigator = useNavigate();
  const [initialValues, setInitialValues] = useState({
    rating: null,
    comment: "",
    orderId: null,
  });

  const validationSchema = Yup.object({
    rating: Yup.number(),
    comment: Yup.string().required(t('required')),
    
  });

  useEffect(() => {
    getOrdersByUser();
  }, []);

  const getOrdersByUser = async () => {
    const res = await fetchGetOrdersByUser();

    if (res && res.result) {
      console.log(res);
      setOrders(res.result);
    }
  };

  const handleCancel = () => {
    
    toast.success("Cancel order successfully!");
  };

  const [rates, setRate] = useState([false, false, false, false, false]);

  const resetRates = () => {
    const arr = [false, false, false, false, false];
    setRate(arr);
  };

  const toggleRate = (index) => {
    const arr = [...rates];
    if (arr[index] === false) for (var i = index; i >= 0; --i) arr[i] = true;
    else for (var i = index + 1; i < 5; ++i) arr[i] = false;
    setRate(arr);
    setInitialValues({ ...initialValues, rating: index + 1 });
  };

  const onSubmit = (value) => {
    postView(value);
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>{t("Your Orders")}</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>{t("Date")}</th>
                  <th>{t("Total")}</th>
                  <th>{t("Order Status")}</th>
                  <th>{t("Payment Method")}</th>
                  <th>{t("Payment Status")}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th>{index + 1}</th>
                      <td>
                        {dateFormat(order.createDate, "dd/MM/yyyy, HH:mm:ss")}
                      </td>
                      <td>
                        <NumericFormat
                          value={order.totalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>{order.orderStatus.name}</td>
                      <td>{order.paymentMethod.name}</td>
                      <td>{order.paymentStatus ? "Paid" : "Not paid yet"}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary m-2"
                          onClick={() =>
                            navigator(`/order-details/${order.id}`)
                          }
                        >
                          {t("Details")}
                        </button>
                        <button
                          className="btn btn-outline-primary m-2"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() =>
                            setInitialValues({
                              ...initialValues,
                              orderId: order.id,
                            })
                          }
                        >
                          {t("Review")}
                        </button>
                        <button
                          className={`btn btn-outline-danger ${
                            order.orderStatus.id > 1 ? "disabled" : ""
                          }`}
                          onClick={handleCancel}
                        >
                          {t("Cancel")}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div
              className="row modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    {t("Review")}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      validateOnChange={false}
                      enableReinitialize
                    >
                      <Form>
                        <div className="row">
                          <div className="col-12 py-2" align="middle">
                            {rates.map((e, i) => (
                              <button
                                type="button"
                                className={
                                  rates[i]
                                    ? "btn btn-warning mx-1"
                                    : "btn btn-outline-warning mx-1"
                                }
                                onClick={() => toggleRate(i)}
                              >
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "brown", fontSize: "48px" }}
                                />
                              </button>
                            ))}
                          </div>
                          <div className="col-12 py-2">
                            <FormikControl
                              control="textarea"
                              label="Comment"
                              name="comment"
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            {t("Cancel")}
                          </button>

                          <button
                            type="submit"
                            className="btn btn-outline-white text-white"
                            style={{ backgroundColor: "#e57905" }}
                            data-bs-dismiss="modal"
                          >
                            {t("Send")}
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
