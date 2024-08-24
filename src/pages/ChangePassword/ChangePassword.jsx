import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { putChangePassword } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextError from "../../components/TextError/TextError";
import {useTranslation} from 'react-i18next'


const ChangePassword = () => {
  const {t} = useTranslation();
  const navigator = useNavigate();

  const [passwordInvalid, setPasswordInvalid] = useState("");

  const initialValues = {
    password: "",
    newPassword: "",
    confirmedNewPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required(t('required'))
      .min(8, t('passMin')),
    newPassword: Yup.string()
      .required(t('required'))
      .min(8, t('passMin')),
    confirmedNewPassword: Yup.string()
      .required(t('required'))
      .oneOf(
        [Yup.ref("newPassword")],
        t('confirmPass')
      ),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    handleChangePassword(values);
  };

  const handleChangePassword = async (data) => {
    const res = await putChangePassword(data);

    if (res && res.code === 1000) {
      toast.success(res.message);
      navigator("/profile");
    } else {
      const message = res.response.data.message;
      toast.error(message);
      setPasswordInvalid(message);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">{t('navChangepassword')}</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
            >
              {(formik) => (
                <Form>
                  {passwordInvalid && (
                    <div className="alert alert-danger" role="alert">
                      {passwordInvalid}
                    </div>
                  )}
                  <FormikControl
                    control="input"
                    type="password"
                    label={t("Current Password")}
                    name="password"
                  />

                  <FormikControl
                    control="input"
                    type="password"
                    label={t("New Password")}
                    name="newPassword"
                  />

                  <FormikControl
                    control="input"
                    type="password"
                    label={t("Confirmed Password")}
                    name="confirmedNewPassword"
                  />

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                      {t('Save')}
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

export default ChangePassword;
