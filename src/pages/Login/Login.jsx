import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { postLogin } from "../../services/AuthService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { setToken } = useContext(StoreContext);

  const navigator = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("Invalid email")).required(t('required')),
    password: Yup.string()
      .required(t('required'))
      .min(8, t('passMin')),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    handleLogin(values);
  };

  const handleLogin = async (data) => {
    const res = await postLogin(data);

    if (res && res.result) {
      const token = res.result.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigator("/home");
    } else {
      const message = res.response.data.message;
      toast.error(message);
    }
  };

  const API_BASE_URL = "http://localhost:8080";
  const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

  const GOOGLE_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorize/google?redirect_uri=" +
    OAUTH2_REDIRECT_URI;

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">{t("navLogin")}</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
            >
              {(formik) => (
                <Form>
                  <FormikControl control="input" label={t('Email')} name="email" />
                  <FormikControl
                    control="input"
                    type="password"
                    label={t('Password')}
                    name="password"
                  />

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                      {t("navLogin")}
                    </button>
                    <button type="reset" className="btn btn-secondary">
                      {t("Cancel")}
                    </button>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="form-text">
                      {t("Create a new account")}?{" "}
                      <Link to={"/register"} className="text-decoration-none">
                        {t("Click here")}
                      </Link>
                    </div>
                    <div className="form-text">
                      <Link
                        to={"/forgot-password"}
                        className="text-decoration-none ms-5"
                      >
                        {t('Forgot Password')}
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="social-login mt-2">
              <p className="mb-2 form-text">{t("Or sign in with")}</p>
              <a className="btn btn-outline-primary" href={GOOGLE_AUTH_URL}>
                <i className="fa-brands fa-google"></i>
                <span className="fw-500 ms-2">Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
