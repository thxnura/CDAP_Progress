import React from "react";
import "./Styles.css";
import { Button, Input } from "antd";
import {
  ShoppingCartOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import useUser from "../services/UserContext";
import useRequest from "../services/RequestContext";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const onSearch = (value) => console.log(value);
const Nav = () => {
  const { user, setUser } = useUser();
  const { UpdateToken } = useRequest();
  const navigate = useNavigate();

  const logout = async () => {
    await UpdateToken(undefined);
    setUser({});
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div className="navBarContainer">
      <div>
        <Button>Home</Button>
      </div>
      <div>
        {user ? (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        )}
      </div>
      <div>
        {user ? (
          <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
            Log Out
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
      <div>
        {user && (
          <Button
            type="primary"
            icon={<ScheduleOutlined />}
            onClick={() => navigate("/mytickets")}
          >
            My Tickets
          </Button>
        )}
      </div>
      <div>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default Nav;
