import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logedin from "../assets/forgot.png";
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
function ForgotPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      return alert("Please all the fields!");
    }
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "https://appointment-app-nn8n.onrender.com/users/forgot-password",
        { email },
        config
      );
      alert(data.message);
      setName("");
      setEmail("");
      history.push("/login");
    } catch (error) {}
  };
  return (
    <Container>
      <Wrapper>
        <Title>FORGOT PASSWORD</Title>
        <Form>
          <Input
            placeholder="user name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="e-mail"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleClick}>Reset Link</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgotPage;
