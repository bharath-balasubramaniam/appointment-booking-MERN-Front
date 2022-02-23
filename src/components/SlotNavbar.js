import React, { useState } from "react";
import { UserState } from "../context/UserProvider";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
import "./navbar.css";
import "./infoModal.css";
import InfoBackdrop from "./InfoBackdrop";
import CreateModal from "./CreateModal";
const Container = styled.div`
  height: 60px;
  position: "fixed";
  background-color: black;
  ${mobile({ height: "50px" })};
  ${tablet({ height: "55px" })};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items:"center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
  ${tablet({ padding: "10px 0px", maxWidth: "10250px" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  ${mobile({ display: "0px", fontSize: "0px !important" })};
  ${tablet({ fontSize: "15px" })};
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: white;
  ${mobile({ display: "none", fontSize: "0px !important" })};
  ${tablet({ fontSize: "10px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // ${mobile({ flex: "2", justifyContent: "start !important" })};
  ${tablet({ flex: "2", justifyContent: "end" })};
`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "9px !important", marginLeft: "20px !important" })};
  ${tablet({ fontSize: "12px", marginLeft: "25px" })};
`;
const Studies = styled.span`
  color: white;
  ${mobile({ display: "none" })};
  ${tablet({ display: "none" })};
`;
const Img = styled.img`
  ${mobile({ width: "35px" })};
  ${tablet({ width: "35px" })};
`;
const Button = styled.button`
  background-color: rgb(240, 181, 104);
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  color: black;
  font-weight: 600;
`;
const SlotNavbar = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = UserState();
  const [showModal, setShowModal] = useState();
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <Img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMPIvsHPaHvNVnTlT_Da4I6URkpvIKi9p0Z_Ur3VJVLj3xdWYgCjlVOtOQrOeZEhDH0DY&usqp=CAU"
              alt=""
              className="topAvatar"
            />
            <div className="topLeft">
              <Span className="logo">Dr. Vishalini</Span>
              <Studies>Cosmetologist MBBS, MD - Dermatology</Studies>
            </div>
          </Left>
          <Right>
            <MenuItems>
              <Button
                style={{ textDecoration: "none" }}
                onClick={showModalHandler}
              >
                {`Create Slot`}
              </Button>
              {showModal && <InfoBackdrop onClick={closeModalHandler} />}
              {showModal && <CreateModal onClose={closeModalHandler} />}
            </MenuItems>
            <MenuItems>
              <Link to="/">
                <Button style={{ textDecoration: "none" }}>{"Home"}</Button>
              </Link>
            </MenuItems>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default SlotNavbar;
