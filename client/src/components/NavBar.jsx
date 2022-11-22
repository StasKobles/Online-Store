import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { Context } from "..";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className="logoLink" to={SHOP_ROUTE}>
          Buy.Me
        </NavLink>
        {user.isAuth ? (
          <Nav className="navBlock">
            <Button
              onClick={() => navigate(ADMIN_ROUTE)}
              variant={"outline-light"}
            >
              Admin panel
            </Button>
            <Button
              onClick={() => logOut()}
              className="btnNav"
              variant={"outline-light"}
            >
              Exit
            </Button>
          </Nav>
        ) : (
          <Nav className="navBlock">
            <Button
              variant={"outline-light"}
              onClick={() =>navigate(LOGIN_ROUTE)}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
