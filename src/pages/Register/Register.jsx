import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { postRegister } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useTranslation} from 'react-i18next'

const Register = () => {
  
  
  const {t} = useTranslation();
  const navigator = useNavigate();

  const initialValues = {
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmedPassword: "",
  };

  const regexPhoneNumber = /^(84|0[3|5|7|8|9])+([0-9]{8})/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('required')),
    lastName: Yup.string().required(t('required')),
    email: Yup.string().email(t("Invalid email")).required(t('required')),
    phoneNumber: Yup.string()
      .matches(regexPhoneNumber, t('phonevalid'))
      .required(t('required')),
    password: Yup.string()
      .required(t('required'))
      .min(8, t('passMin')),
    confirmedPassword: Yup.string()
      .required(t('required'))
      .oneOf([Yup.ref("password")], t('confirmPass')),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    console.log("Saved data: ", JSON.stringify(values));
    handleRegister(values);
  };

  const handleRegister = async (data) => {
    const res = await postRegister(data);

    if (res && res.result) {
      console.log("Register user: ", res.result);
      navigator("/login");
    } else {
      console.log(res.response.data);
      const message = res.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">{t('Register')}</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
            >
              {(formik) => (
                <Form>
                  <FormikControl control="input" label="Email" name="email" />
                  <div className="row">
                    <div className="col-6">
                      <FormikControl
                        control="input"
                        label={t("First name")}
                        name="firstName"
                      />
                    </div>
                    <div className="col-6">
                      <FormikControl
                        control="input"
                        label={t("Last name")}
                        name="lastName"
                      />
                    </div>
                  </div>
                  <FormikControl
                    control="input"
                    label={t("Phone number")}
                    name="phoneNumber"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label={t("Password")}
                    name="password"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label={t("Confirmed Password")}
                    name="confirmedPassword"
                  />

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                    {t('Register')}
                    </button>
                    <button type="reset" className="btn btn-secondary">
                    {t('Cancel')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
