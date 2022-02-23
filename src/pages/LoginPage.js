import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logedin from "../assets/login.png";
import { mobile, tablet } from "../responsive";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),
    url("${logedin}?auto=compress&cs=tinysrgb&dpr=2&h=1250&w=1260") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  ${mobile({ width: "75% !important" })}
  ${tablet({ width: "80%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  left: 27%;
  color: white;
`;
const Button1 = styled.button`
  border: none;
  padding: 13px 20px;
  background-color: red;
  cursor: pointer;
  margin: 5px 5px 10px 5px;
  color: white;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Button2 = styled.button`
  border: none;
  padding: 13px 25px;
  background-color: orange;
  cursor: pointer;
  margin: 5px 5px 10px 5px;
  color: white;
`;
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return alert("Please all the fields!");
    }
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "https://appointment-booking-be.herokuapp.com/users/login",

        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setEmail("");
      setPassword("");
      history.push("/");
      history.go(0);
    } catch (error) {
      if (error) console.log(error.message);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="user name"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>Log in</Button>
          <ButtonWrapper>
            <Link to="/forgot-password">
              <Button1>Forgot</Button1>
            </Link>
            <Link to="/register">
              <Button2>Sign up</Button2>
            </Link>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default LoginPage;
