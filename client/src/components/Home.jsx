import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Space,
  message,
  Menu,
  Dropdown,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Styles.css";
import Nav from "./navbar";
import useUser from "../services/UserContext";
import useRequest from "../services/RequestContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useUser();
  const { request } = useRequest();
  const navigate = useNavigate();
  const { Text } = Typography;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const menu = (
    <>
      {user && (
        <Menu
          style={{ backgroundColor: "#4f2c8d", border: "none" }}
          items={[
            {
              label: (
                <>
                  {(user.role === "admin" || user.role === "movie admin") && (
                    <Button id="btn" onClick={() => navigate("/addmovie")}>
                      Movie Manage
                    </Button>
                  )}
                </>
              ),
            },
            {
              label: (
                <>
                  {user.role === "admin" && (
                    <Button
                      id="btn"
                      onClick={() => navigate("/admin/movieadminmanagement")}
                    >
                      Admin Manage
                    </Button>
                  )}
                </>
              ),
            },
            {
              label: (
                <>
                  {user.role === "admin" && (
                    <Button
                      id="btn"
                      onClick={() => navigate("/admin/customerManagement")}
                    >
                      Customer Manage
                    </Button>
                  )}
                </>
              ),
            },
          ]}
        />
      )}
    </>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    values.movieId = selectedMovie._id;
    values.movieTitle = selectedMovie.title;
    values.showTime = selectedMovie.showTime;
    values.price = selectedMovie.price;
    values.userId = user._id;
    values.status = "unpaid";
    values.subTotal = selectedMovie.price * values.quantity;
    console.log("value", values);
    try {
      const res = await request.post("booking", values);
      if (res.status === 201) {
        message.success("Successfully added to cart!");
        setIsModalVisible(false);
        onReset();
      } else {
        message.error("Something went wrong. Please try again!");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    onReset();
  };

  const getMovies = async () => {
    try {
      const result = await request.get("movie");
      if (result.status === 200) {
        console.log("movies ", result.data);
        setMovies(result.data);
      } else {
        console.log("Error while getting movies");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Nav />
      {user && (
        <div className="adminMenu">
          {(user.role === "admin" || user.role === "movie admin") && (
            <Dropdown overlay={menu} className="dropDown">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Admin Menu
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
      )}

      <div className="site-card-wrapper">
        <div>
          <Row gutter={20}>
            {movies.map((movie) => (
              <Col span={6} style={{ marginBottom: 20 }} key={movie._id}>
                <Card
                  style={{ width: 250 }}
                  cover={
                    <img
                      alt="example"
                      src="https://yt3.ggpht.com/ytc/AKedOLSkNBClOIZNjJayMdTxRhUh6LYEXjjjCv0tMJ3-mA=s900-c-k-c0x00ffffff-no-rj"
                    />
                  }
                >
                  <Space direction="vertical">
                    <Text strong>{movie.title}</Text>
                    <Text>{movie.category}</Text>
                    <Text>Show Time: {movie.showTime}</Text>
                    <Text>Price: {movie.price} LKR</Text>
                    <Button
                      onClick={() => {
                        setSelectedMovie(movie);
                        showModal();
                      }}
                      style={{ fontWeight: "bold" }}
                    >
                      Add To Cart
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <br />
        <br />
        <br />
      </div>
      <br />

      <center>
        <Button id="btn">Admin Manage</Button>

        <Button id="btn">Customer Manage</Button>
        <Button id="btn">Movie Manage</Button>
      </center>

      <div>
        <Modal
          title="Book Your Ticket"
          visible={isModalVisible}
          onCancel={handleCancel}
          width={600}
          footer={null}
        >
          <div>
            {user ? (
              selectedMovie && (
                <Form
                  form={form}
                  onFinish={handleOk}
                  initialValues={{ remember: true }}
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  layout="horizontal"
                >
                  <Form.Item label="Movie Name">
                    <Text strong>{selectedMovie.title}</Text>
                  </Form.Item>

                  <Form.Item label="Price">
                    <Text strong>{selectedMovie.price} LKR</Text>
                  </Form.Item>

                  <Form.Item label="Show Time">
                    <Text strong>{selectedMovie.showTime} LKR</Text>
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Ticket Qty"
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input quantity.",
                      },
                    ]}
                  >
                    <InputNumber min={1} max={10} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )
            ) : (
              <h3>To book a ticket please register or login!</h3>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Home;
