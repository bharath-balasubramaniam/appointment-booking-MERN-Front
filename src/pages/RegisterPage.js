import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import registered from "../assets/register.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),
    url("${registered}?auto=compress&cs=tinysrgb&dpr=2&h=1550&w=1260") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  ${mobile({ width: "75% !important" })}
  ${tablet({ width: "80%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const InputFile = styled.input`
  flex: 1;
  margin: 3px 0px 0px 0px;
  padding: 10px 0px;
  width: 50%;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  background-color: teal;
  cursor: pointer;
  color: white;
`;
const Span = styled.span`
  font-size: 15px;
  width:20%
  border: 1px solid gray;
  margin-top: 20px;
  display: inline-flex;
  background-color: white;
`;
const SpanText = styled.p`
  font-size: 15px;
  width: 30%;
  padding-left: 7px;
  color: gray;
`;
function RegisterPage() {
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [pic, setPic] = useState(
    "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
  );
  const history = useHistory();
  const postDetails = (pic) => {
    setDisable(true);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "BV-Chat");
      data.append("cloud_name", "darhe4mxq");
      fetch("https://api.cloudinary.com/v1_1/darhe4mxq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        });
      setTimeout(() => {
        setDisable(false);
      }, 3000);
    } else {
      alert("Please select a valid file");
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (!name || !password || !email || !contact) {
      alert("please fill all the fields!");
      setDisable(true);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://appointment-app-nn8n.onrender.com/users/register",
        { name, email, contact, password, pic },
        config
      );
      console.log(data);
      setDisable(false);
      setName("");
      setContact("");
      setEmail("");
      setPassword("");
      history.push("/login");
      return;
    } catch (error) {
      console.log(error.message);
      setDisable(false);
      return;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="name"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="e-mail"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
          />
          <Input
            onChange={(e) => setContact(e.target.value)}
            type="number"
            name="contact"
            placeholder="mobile-no"
          />
          <Span>
            <SpanText>Profile Pic:</SpanText>
            <InputFile
              type="file"
              accept="image"
              onChange={(e) => postDetails(e.target.files[0])}
              style={{ backgroundColor: "transparent" }}
            />
          </Span>
          <Agreement>
            By creating an account, i consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={disable}>
            Create
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default RegisterPage;
