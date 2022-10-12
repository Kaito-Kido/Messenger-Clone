import React from "react";
import {
  Container,
  Form,
  Title,
  Input,
  Label,
  SubmitButton,
  Error,
} from "./styled";
import { Regist } from "../Login/styled";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signUp(data);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        "username",
        { message: err.response.data },
        { shouldFocus: true }
      );
    }
  };
  return (
    <Container>
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg"
        alt=""
      />
      <Title>Messenger</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errors.username && <Error>{errors.username?.message}</Error>}
        <Label>Email</Label>
        <Input
          type="text"
          {...register("username", {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.username?.type === "required" && (
          <Error>Username is required</Error>
        )}
        {errors.username?.type === "pattern" && (
          <Error>Please enter a valid email</Error>
        )}
        <Label>Password</Label>
        <Input type="password" {...register("password", { required: true })} />
        {errors.password && <Error>Password is required</Error>}
        <SubmitButton>Sign up</SubmitButton>
      </Form>
      <p>
        Already have account?
        <Regist onClick={() => navigate("/login")}> Login</Regist>
      </p>
    </Container>
  );
};

export default Register;
