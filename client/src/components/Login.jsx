import React from "react";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import useRequest from "../services/RequestContext";
import useUser from "../services/UserContext";

function Login() {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const { request, UpdateToken } = useRequest();
  const [form] = Form.useForm();
  const { decodeToken, user } = useUser();

  // Check if the user is already logged in and redirect
  if (user) {
    navigate("/");
    return null;
  }

  const onFinish = async (values) => {
    try {
      const res = await request.post("login", values);
      if (res.status === 200) {
        await UpdateToken(res.data.data.token);
        decodeToken(res.data.data.token);
        navigate("/");
      } else {
        message.error("Incorrect Email or Password!");
        onReset();
      }
    } catch (e) {
      console.log("login error ", e);
      message.error("Incorrect Email or Password!");
      onReset();
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="login-main-component">
      <Card
        className="loginCard"
        title="Sign In"
        headStyle={{ fontSize: 30, fontWeight: "bold", border: "none" }}
      >
        <Form
          style={{ width: 400 }}
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            className="lableText"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              style={{ width: 400, borderRadius: 4, height: 40 }}
              placeholder="Enter Username"
            />
          </Form.Item>

          <Form.Item
            className="lableText"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              style={{ width: 400, borderRadius: 4, height: 40 }}
              placeholder="Enter Password"
            />
          </Form.Item>

          <Form.Item style={{ alignItems: "center" }}>
            <Button type="primary" htmlType="submit" className="loginBtn">
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Space>
              <Text>Do not have an account?</Text> <Link strong>Sign Up</Link>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
