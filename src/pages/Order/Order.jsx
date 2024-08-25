import React, { useEffect, useState } from "react";
import {
  fetchGetOrdersByUser,
  putCreateOrder,
} from "../../services/OrderService";
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
import { Space, Table } from "antd";

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
    comment: Yup.string().required(t("required")),
  });

  useEffect(() => {
    getOrdersByUser();
  }, []);

  const getOrdersByUser = async () => {
    const res = await fetchGetOrdersByUser();

    if (res && res.result) {
      const data = res.result;
      const reverseData = data
        .filter((e) => e.orderStatus.name != "Cancel")
        .reverse()
        .map((element, index) => ({
          ...element,
          key: index + 1,
        }));
      setOrders(reverseData);
    }
  };

  //test
  const handleCancel = async (id) => {
    var data = {
      id: id,
      orderStatus: { id: 6, name: "Cancel" },
      paymentStatus: false,
    };

    const res = await putCreateOrder(data);

    if (res && res.result) {
      toast.success("Cancel order successfully!");
    }
    setTimeout(() => window.location.reload(), 3000);
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

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: <th>{t("Date")}</th>,
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => (
        <td className="ant-table-cell ant-table-column-sort">
          {dateFormat(createDate, "dd/MM/yyyy, HH:mm:ss")}
        </td>
      ),
    },
    {
      title: <th>{t("Total")}</th>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => (
        <td className="ant-table-cell ant-table-column-sort">
          <NumericFormat
            value={totalPrice}
            displayType="text"
            thousandSeparator=","
            suffix=" đ"
          />
        </td>
      ),
    },
    {
      title: <th>{t("Order Status")}</th>,
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <td className="ant-table-cell ant-table-column-sort">
          {orderStatus.name}
        </td>
      ),
    },
    {
      title: <th>{t("Payment Method")}</th>,
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => (
        <td className="ant-table-cell ant-table-column-sort">
          {paymentMethod.name}
        </td>
      ),
    },
    {
      title: <th>{t("Payment Status")}</th>,
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <td className="ant-table-cell ant-table-column-sort">
          {paymentStatus ? "Paid" : "Not paid yet"}
        </td>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (_, order) => (
        <Space size="middle">
          <td>
            <button
              className="btn btn-outline-primary m-2"
              onClick={() => navigator(`/order-details/${order.id}`)}
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
              onClick={() => handleCancel(order.id)}
            >
              {t("Cancel")}
            </button>
          </td>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="container mt-3 shadow-sm rounded py-3">
        <div className="row mb-3">
          <div className="card border-0">
            <div className="templatemo-content-widget white-bg">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <h4>{t("Your Orders")}</h4>
              </div>
              <div className="panel panel-default table-responsive">
                <Table columns={columns} dataSource={orders} />
              </div>
            </div>
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
                            type="reset"
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
    </>
  );
};

export default Order;
