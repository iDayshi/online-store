import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { IErrors } from "../../types";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (target: { name: string; value: string }) => {
    setData((PrevState) => ({
      ...PrevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: {
        message: "Email введён неверно",
      },
    },
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      min: {
        message: "Имя должен состоять минимум из 3-x символов",
        value: 3,
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    history("/");
    // @ts-ignore
    dispatch(signUp(data));
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
      <TextField
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
        placeholder={"Enter your name"}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:shadow-outline block w-full"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
