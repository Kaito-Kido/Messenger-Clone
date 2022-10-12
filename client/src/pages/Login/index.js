import { useContext, useState } from "react";
import {
  Container,
  Form,
  Title,
  Input,
  Label,
  SubmitButton,
  Error,
  Regist,
} from "./styled";
import { useForm } from "react-hook-form";
import { logIn } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/actions";
import { ChangeUserContext, UserContext } from "../../context/userContext";

const Login = () => {
  const userLogin = useContext(ChangeUserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await logIn(data);
      if (res.status === 200) {
        setIsLoading(false);
        userLogin(res.data);
        await localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
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
      <Title>Connect with your favorite people</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errors.username && <Error>{errors.username?.message}</Error>}
        <Label>Email</Label>
        <Input
          type="text"
          {...register("username", {
            required: true,
          })}
        />
        {errors.username?.type === "required" && (
          <Error>Username is required</Error>
        )}
        <Label>Password</Label>
        <Input type="password" {...register("password", { required: true })} />
        {errors.password && <Error>Password is required</Error>}
        <SubmitButton>{isLoading ? "Loading..." : "Login"}</SubmitButton>
      </Form>
      <p>
        Don't have account?
        <Regist onClick={() => navigate("/register")}> Register</Regist>
      </p>
    </Container>
  );
};

export default Login;
