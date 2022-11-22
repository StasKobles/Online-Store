import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate, } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="authContainer"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="authCard">
        <h2 className="authFormTitle">
          {isLogin ? "Authorization" : "Registration"}
        </h2>
        <Form className="authForm">
          <Form.Control
            className="authFormControl"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="authFormControl"
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Form className="authRow">
            {isLogin ? (
              <div>
                No account?
                <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
              </div>
            ) : (
              <div>
                Have account?
                <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
              </div>
            )}
            <Button variant="outline-dark" onClick={click}>
              {isLogin ? "Log in" : "Create"}
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
