import React, { useEffect, useState } from "react";
import {
  fetchGetOrdersByUser,
  putUpdateOrderStatus,
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
import { fetchGetAllOrderStatuses } from "../../services/OrderStatusService";

const Order = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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

  const getOrdersByUser = async () => {
    const res = await fetchGetOrdersByUser();

    if (res && res.result) {
      const data = res.result
        .reverse()
        .map((item, index) => ({ ...item, key: index + 1 }));

      console.log("Orders by user: ", data);

      setOrders(data);
    }
  };

  const getAllOrderStatuses = async () => {
    const res = await fetchGetAllOrderStatuses();

    if (res && res.result) {
      const orderStatuses = res.result;
      setOrderStatuses(
        orderStatuses.map((orderStatus) => ({
          text: orderStatus.name,
          value: orderStatus.id,
        }))
      );
    }
  };

  useEffect(() => {
    getOrdersByUser();
    getAllOrderStatuses();
  }, []);

  const handleCancel = async (id) => {
    const data = {
      id: id,
      orderStatus: { id: 6 },
      paymentStatus: false,
    };

    const res = await putUpdateOrderStatus(data);

    if (res && res.result) {
      toast.success("Cancel order successfully!");
      getOrdersByUser();
    } else {
      toast.error("Error canceling order!");
    }
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
      key: "1",
      title: "#",
      dataIndex: "key",
    },
    {
      key: "2",
      title: <>{t("Date")}</>,
      dataIndex: "createDate",
      width: 200,
      render: (createDate) => (
        <>{dateFormat(createDate, "dd/MM/yyyy, HH:mm:ss")}</>
      ),
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      key: "3",
      title: <>{t("Total")}</>,
      dataIndex: "totalPrice",
      width: 120,
      render: (totalPrice) => (
        <NumericFormat
          value={totalPrice}
          displayType="text"
          thousandSeparator=","
          suffix=" đ"
        />
      ),
      sorter: (firstRecord, secondRecord) =>
        firstRecord.totalPrice - secondRecord.totalPrice,
    },
    {
      key: "4",
      title: <>{t("Order Status")}</>,
      dataIndex: "orderStatus",
      filters: orderStatuses,
      onFilter: (value, record) => {
        return record.orderStatus.id === value;
      },
      render: (orderStatus) => <>{orderStatus.name}</>,
    },
    {
      key: "5",
      title: <>{t("Payment Method")}</>,
      dataIndex: "paymentMethod",
      filters: [
        { text: "COD", value: 1 },
        { text: "VNPAY", value: 2 },
        { text: "MoMo", value: 3 },
      ],
      onFilter: (value, record) => {
        return record.paymentMethod.id === value;
      },
      render: (paymentMethod) => <>{paymentMethod.name}</>,
    },
    {
      key: "6",
      title: <>{t("Payment Status")}</>,
      dataIndex: "paymentStatus",
      render: (paymentStatus) => <>{paymentStatus ? "Paid" : "Not paid yet"}</>,
      filters: [
        { text: "Paid", value: true },
        { text: "Not paid yet", value: false },
      ],
      onFilter: (value, record) => {
        return record.paymentStatus === value;
      },
    },
    {
      key: "6",
      render: (record) => {
        return (
          <Space gap="middle" justify="center" align="center">
            <button
              className="btn btn-outline-primary m-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() =>
                setInitialValues({
                  ...initialValues,
                  orderId: record.id,
                })
              }
            >
              {t("Review")}
            </button>
            <button
              className="btn btn-outline-primary m-2"
              onClick={() => navigator(`/order-details/${record.id}`)}
            >
              {t("Details")}
            </button>
            <button
              className={`btn btn-outline-danger ${
                record.orderStatus.id > 1 ? "disabled" : ""
              }`}
              onClick={() => handleCancel(record.id)}
            >
              {t("Cancel")}
            </button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="container mt-3 shadow-sm rounded py-3">
        <div className="row mb-3">
          <div className="card border-0">
            <div className="templatemo-content-widget white-bg">
              <h4>{t("Your Orders")}</h4>
              <Table
                columns={columns}
                dataSource={orders}
                pagination={{
                  current: pageNumber,
                  pageSize: pageSize,
                  onChange: (pageNumber, pageSize) => {
                    setPageNumber(pageNumber), setPageSize(pageSize);
                  },
                }}
                scroll={{ x: true }}
              ></Table>
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
