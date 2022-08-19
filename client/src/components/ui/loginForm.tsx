import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/user";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const history = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const loginError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((PrevState) => ({
      ...PrevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: {
        message: "Emal введён неверно",
      },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8-ми символов",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    // @ts-ignore
    dispatch(login({ payload: data }, () => history("/")));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        placeholder={"Enter your email"}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        placeholder={"Enter your password"}
      />
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline block w-full"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
