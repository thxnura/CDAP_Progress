import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  Table,
  Space,
  Modal,
  message,
  Select,
  Popconfirm,
} from "antd";
import "./stylesAdmin.css";
import useRequest from "../../services/RequestContext";
// import { deleteMovie } from "../../../../ds-assignment-backend/src/controllers/movie.controller";
const { Option } = Select;
function Add() {
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const res = await request.put(`movie/${selectedMovie._id}`, values);
      if (res.status === 200) {
        message.success("Movie successfully Updated!");
        setIsModalVisible(false);
        setSelectedMovie(undefined);
        getMovies();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedMovie(undefined);
    setIsModalVisible(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const res = await request.post("movie", values);
      if (res.status === 201) {
        message.success("Movie successfully added!");
        console.log("move", res);
        onReset();
        getMovies();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const getMovies = async () => {
    try {
      const res = await request.get("movie");
      if (res.status === 200) {
        console.log("movies", res);
        setMovies(res.data);
        setSelectedMovie(undefined);
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = await request.delete(`movie/${id}`);
      if (res.status === 200) {
        message.success("Successfully Removed!");
        getMovies();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getMovies();
    handleCancel();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Movie Name",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "des",
    },
    {
      title: "Ticket Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Show Time",
      dataIndex: "showTime",
      key: "time",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (record, index) => (
        <React.Fragment key={index}>
          <Space size="middle">
            <Button
              onClick={() => {
                setSelectedMovie(record);
                showModal();
              }}
            >
              Update
            </Button>
            <Popconfirm
              title="Are you sure to delete this movie?"
              onConfirm={() => {
                deleteMovie(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </Space>
        </React.Fragment>
      ),
    },
  ];

  return (
    <Layout>
      <h1>
        <center>Add Your Movie</center>
      </h1>
      <br />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Movie Name"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ticket Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="Show Time"
          name="showTime"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          label="Show Time"
          name="showTime"
          rules={[
            {
              required: true,
              message: "Please input movie show time !",
            },
          ]}
        >
          <Select
            // mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            <Option value="10.30" label="10.30">
              10.30
            </Option>
            <Option value="1.30" label="1.30">
              1.30
            </Option>
            <Option value="6.00" label="6.00">
              6.00
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div>
        <Table dataSource={movies} columns={columns} />
      </div>

      <Modal
        maskClosable={false}
        title="Update"
        width={700}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={selectedMovie}
          onFinish={handleUpdate}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          <Form.Item
            label="Movie Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ticket Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Show Time"
            name="showTime"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ float: "right" }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default Add;
