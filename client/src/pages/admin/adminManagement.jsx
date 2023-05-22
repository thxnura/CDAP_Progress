import React, { useEffect, useState } from "react";
import { Form, Input, Table, Button, message, Popconfirm } from "antd";
import "./admin.css";
import useRequest from "../../services/RequestContext";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [form] = Form.useForm();
  const { request } = useRequest();

  const getAdmins = async () => {
    try {
      const res = await request.get("movieadmin");
      if (res.status === 200) {
        console.log("admins", res);
        setAdmins(res.data);
      } else {
        message.error("failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const deleteAdmin = async (id) => {
    try {
      const res = await request.delete(`movieadmin/${id}`);
      if (res.status === 200) {
        message.success("Successfully Removed!");
        getAdmins();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const onFinish = async (values) => {
    values.role = "movie admin";
    try {
      const res = await request.post("movieadmin", values);
      if (res.status === 201) {
        message.success("Movie Admin successfully added!");
        console.log("move", res);
        onReset();
        getAdmins();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Popconfirm
          title="Are you sure to delete this admin?"
          onConfirm={() => {
            deleteAdmin(record._id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className="MainContainer-Item">
      <div className="form-item">
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input mobile!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              ADD
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Table dataSource={admins} columns={columns} className="admin-table" />
      </div>
    </div>
  );
};

export default AdminManagement;
