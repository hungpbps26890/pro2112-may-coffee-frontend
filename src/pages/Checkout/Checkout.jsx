import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { NumericFormat } from "react-number-format";
import { fetchGetAllPaymentMethods } from "../../services/PaymentMethodService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { postCreateOrder } from "../../services/OrderService";
import { toast } from "react-toastify";
import SelectAddress from "../../components/Address/SelectAddress";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../../services/VNProvinceService";
import {
  fetchGetAllVouchers,
  fetchAllValidVouchers,
  fetchGetVoucherById,
} from "../../services/VoucherService";
import { useTranslation } from "react-i18next";
import { createVNPayPayment } from "../../services/PaymentService";

const Checkout = () => {
  const { cart, getCartByUser } = useContext(StoreContext);
  const { t } = useTranslation();

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState({
    id: 79,
    name: "Thành phô Hồ Chí Minh",
  });
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({ id: null, name: "" });
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState({ id: null, name: "" });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [user, setUser] = useState();
  const [vouchers, setVouchers] = useState([]);
  const [arrVoucher, setArrVoucher] = useState([]);
  const [shippingFee, setShippingFee] = useState();
  const [voucher, setVoucher] = useState({});
  const [voucherId, setVoucherId] = useState();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    paymentMethodId: 1,
    address: {
      streetNumber: "",
      ward: "",
      district: "",
      province: "79",
    },
    voucherId: -1,
  });

  const handFeeShip = () => {
    if (district.id === 761) {
      setShippingFee(12000);
      return 12000;
    } else if (
      district.id === 784 ||
      district.id === 765 ||
      district.id === 764 ||
      district.id === 766 ||
      district.id === 767 ||
      district.id === 762 ||
      district.id === 777
    ) {
      setShippingFee(23000);
      return 23000;
    } else {
      setShippingFee(46000);
      return 46000;
    }
  };

  const feeShip = useMemo(() => handFeeShip(), [district]);

  const [discountTotalPrice, setDiscountTotalPrice] = useState(
    cart.totalPrice + feeShip
  );

  const navigator = useNavigate();

  useEffect(() => {
    getAllPaymentMethods();
    getAllVouchers();
  }, []);

  useEffect(() => {
    getVoucherById(voucherId);
    console.log(voucher);
  }, [voucherId]);

  useEffect(() => {
    if (voucher.amount < 1)
      setDiscountTotalPrice(
        Math.ceil((cart.totalPrice + feeShip) * (1 - voucher.amount))
      );
    else if (voucher.amount > 1)
      setDiscountTotalPrice(
        Math.ceil(cart.totalPrice - voucher.amount + feeShip)
      );
    else setDiscountTotalPrice(Math.ceil(cart.totalPrice + feeShip));
  }, [shippingFee]);

  useEffect(() => {
    setVoucher(voucher);
    if (voucher.amount < 1)
      setDiscountTotalPrice(
        Math.ceil((cart.totalPrice + feeShip) * (1 - voucher.amount))
      );
    else
      setDiscountTotalPrice(
        Math.ceil(cart.totalPrice - voucher.amount + feeShip)
      );

    console.log("voucher: ", voucher);
  }, [voucher]);

  useEffect(() => {
    setUser(cart.user);
  }, [cart]);

  useEffect(() => {
    setDiscountTotalPrice(discountTotalPrice);
  }, [discountTotalPrice]);

  useEffect(() => {
    if (user) {
      setInitialValues((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }));
    }
  }, [user]);

  const getAllPaymentMethods = async () => {
    const res = await fetchGetAllPaymentMethods();

    if (res && res.result) {
      const paymentMethodsData = res.result;

      setPaymentMethods(
        paymentMethodsData.map((paymentMethod) => ({
          key: paymentMethod.name,
          value: paymentMethod.id,
        }))
      );
    }
  };

  const getAllVouchers = async () => {
    const res = await fetchAllValidVouchers();
    if (res && res.result) {
      const vouchersData = res.result;
      setArrVoucher(vouchersData);
      setVouchers(
        vouchersData.map((voucher) => ({
          key: voucher.amount,
          value: voucher.id,
        }))
      );
    }
  };

  const getVoucherById = async (voucherId) => {
    const res = await fetchGetVoucherById(voucherId);
    if (res && res.result) {
      const voucherData = res.result;
      setVoucher(voucherData);
    }
  };

  useEffect(() => {
    const fetchPublicProvinces = async () => {
      const response = await apiGetPublicProvinces();
      console.log(response);

      if (response.status === 200)
        setProvinces(
          response.data.results.map((province) => ({
            key: province.province_name,
            value: province.province_id,
          }))
        );
    };

    fetchPublicProvinces();
  }, []);

  useEffect(() => {
    const fetchPublicDistricts = async (province) => {
      const response = await apiGetPublicDistricts(province.id);

      if (response.status === 200)
        setDistricts(
          response.data.results.map((district) => ({
            key: district.district_name,
            value: district.district_id,
          }))
        );
    };

    if (province.id) fetchPublicDistricts(province);
  }, [province]);

  useEffect(() => {
    const fetchPublicWards = async (district) => {
      const response = await apiGetPublicWards(district.id);

      if (response.status === 200)
        setWards(
          response.data.results.map((ward) => ({
            key: ward.ward_name,
            value: ward.ward_id,
          }))
        );
    };

    if (district.id) fetchPublicWards(district);
  }, [district]);

  const regexPhoneNumber = /^(84|0[3|5|7|8|9])+([0-9]{8})/;

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required(t("required")),
    phoneNumber: Yup.string()
      .matches(regexPhoneNumber, "Phone number is not valid")
      .required(t("required")),
    firstName: Yup.string().required(t("required")),
    lastName: Yup.string().required(t("required")),
    address: Yup.object({
      streetNumber: Yup.string().required(t("required")),
      ward: Yup.string().required(t("required")),
      district: Yup.string().required(t("required")),
      province: Yup.string().required(t("required")),
    }),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);

    const data = {
      address: {
        streetNumber: values.address.streetNumber,
        ward: ward.name,
        district: district.name,
        province: province.name,
      },
      paymentMethod: { id: values.paymentMethodId },
      voucher: voucher,
      feeShip: feeShip,
    };

    console.log("Data: ", data);

    if (cart.cartItems.length > 0) {
      handleCreateOrder(data);
    } else {
      toast.info("Your cart is empty, please add some drink to cart!");
      navigator("/menu");
    }
  };

  const handleCreateOrder = async (data) => {
    const res = await postCreateOrder(data);

    if (res && res.result) {
      const createdOrder = res.result;
      console.log("Created order: ", createdOrder);

      if (createdOrder.paymentMethod.name === "VNPAY") {
        const paymentResponse = await createVNPayPayment(
          createdOrder.totalPrice,
          createdOrder.id
        );

        if (paymentResponse && paymentResponse.code == 1000) {
          console.log("Payment response: ", paymentResponse);
          window.location.href = paymentResponse.result.paymentUrl;
        }
      } else {
        toast.success(res.message);
        getCartByUser();

        navigator("/order");
      }
    }
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>{t("Your Order")}</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center ">
                  <th>#</th>
                  <th>{t("Drink")}</th>
                  <th>{t("Price")}</th>
                  <th>{t("Size")}</th>
                  <th>{t("Topping")}</th>
                  <th>{t("Quantity")}</th>
                  <th>{t("Total")}</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.cartItems &&
                  cart.cartItems.map((cartItem, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th>{index + 1}</th>
                      <td>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/drinks/${cartItem.drink.id}`}
                        >
                          {cartItem.drink.name}
                        </Link>
                      </td>
                      <td>
                        <NumericFormat
                          value={cartItem.price / cartItem.quantity}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>
                        <span className="badge rounded-pill text-bg-secondary py-2 px-4">
                          {cartItem.size && cartItem.size.character}
                        </span>
                      </td>
                      <td style={{ maxWidth: 140 }}>
                        <div className="d-flex justify-content-center flex-wrap">
                          {cartItem.toppings.length > 0 &&
                            cartItem.toppings.map((topping) => (
                              <span
                                className="badge rounded-pill text-bg-secondary m-1 py-2 px-3"
                                key={`topping-${topping.id}`}
                              >
                                {topping.name}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td>{cartItem.quantity}</td>
                      <td>
                        <NumericFormat
                          value={cartItem.price}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card h-100 border-0">
                  <h4>{t("Delivery")}</h4>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <FormikControl
                          control="input"
                          label={t("First name")}
                          name="firstName"
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <FormikControl
                          control="input"
                          label={t("Last name")}
                          name="lastName"
                          readOnly
                        />
                      </div>
                    </div>

                    <FormikControl
                      control="input"
                      label="Email"
                      name="email"
                      readOnly
                    />

                    <FormikControl
                      control="input"
                      label={t("Phone number")}
                      name="phoneNumber"
                      readOnly
                    />

                    <FormikControl
                      control="input"
                      label={t("Street number")}
                      name="address.streetNumber"
                    />

                    <div className="row">
                      <div className="col-md-4">
                        <SelectAddress
                          label={t("Ward")}
                          options={wards}
                          name="address.ward"
                          setValue={setWard}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectAddress
                          label={t("District")}
                          options={districts}
                          name="address.district"
                          setValue={setDistrict}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectAddress
                          label={t("Province")}
                          options={provinces}
                          name="address.province"
                          setValue={setProvince}
                        />
                      </div>
                    </div>
                    <FormikControl
                      control="select"
                      label={t("Payment")}
                      name="paymentMethodId"
                      options={paymentMethods}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card h-100 border-0">
                  <h4>{t("Order Totals")}</h4>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">{t("Quantity")}</p>
                      <p className="card-text">{cart.totalItems}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">{t("Subtotal")}</p>
                      <p className="card-text">
                        <NumericFormat
                          value={cart.totalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">{t("Delivery Fee")}</p>
                      <p className="card-text">
                        <NumericFormat
                          value={feeShip}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <div className="d-flex justify-content-between">
                          <span className="text-warning">{t("Voucher")}</span>
                        </div>
                        {voucher.amount && (
                          <div className="d-flex justify-content-between mt-1">
                            <span className="card-text">
                              {voucher.amount > 1
                                ? "Miễn phí giao hàng"
                                : "Giảm"}
                            </span>
                            <span className="card-text">
                              {voucher.amount > 1 ? (
                                <NumericFormat
                                  value={voucher.amount}
                                  displayType="text"
                                  thousandSeparator=","
                                  suffix=" đ"
                                />
                              ) : (
                                voucher.amount * 100 + "%"
                              )}
                            </span>
                          </div>
                        )}
                      </button>
                      <>
                        {/* Modal */}
                        <div
                          className="modal fade"
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
                                <h1
                                  className="modal-title fs-5"
                                  id="staticBackdropLabel"
                                >
                                  {t("Voucher")}
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              {arrVoucher.length > 0 &&
                                arrVoucher.map((e, i) => (
                                  <button
                                    type="button"
                                    className="btn modal-body container-fluid"
                                    data-bs-dismiss="modal"
                                    onClick={() => setVoucherId(e.id)}
                                  >
                                    <div className="card">
                                      <img
                                        src={e.image}
                                        className="card-img-top"
                                        alt="Voucher image"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {e.amount && (
                                            <div className="d-flex justify-content-between mt-1">
                                              <span className="card-text">
                                                {e.amount > 1
                                                  ? "Miễn phí giao hàng"
                                                  : "Giảm"}
                                              </span>
                                              <span className="card-text">
                                                {e.amount > 1 ? (
                                                  <NumericFormat
                                                    value={e.amount}
                                                    displayType="text"
                                                    thousandSeparator=","
                                                    suffix=" đ"
                                                  />
                                                ) : (
                                                  e.amount * 100 + "%"
                                                )}
                                              </span>
                                            </div>
                                          )}
                                        </h5>
                                      </div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between">
                      <h6 className="card-text">{t("Subtotal")}</h6>
                      <h6 className="card-text text-danger">
                        <NumericFormat
                          value={discountTotalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </h6>
                    </div>
                    <hr />

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-outline-white text-white"
                        style={{ backgroundColor: "#e57905" }}
                      >
                        {t("Place Order")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
