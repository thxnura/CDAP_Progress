import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Table, Card, Select, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
const { Option } = Select;

function Cart() {
  const [tickets, setTickets] = useState([]);
  const [subTotals, setSubTotals] = useState([]);
  const [total, setTotal] = useState(0);
  const { request } = useRequest();
  const navigate = useNavigate();
  const { user } = useUser();

  const getTickets = async () => {
    try {
      const res = await request.get(`booking/${user._id}`);
      if (res.status === 200) {
        console.log("tickets", res.data);
        setTickets(res.data);
        setSubTotals(res.data.map((val) => val.subTotal));
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTicket = async (id) => {
    try {
      const res = await request.delete(`booking/${id}`);
      if (res.status === 200) {
        message.success("Successfully Removed!");
        getTickets();
      } else {
        message.error("failed!");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getTickets();
  }, [user]);

  const columns = [
    {
      title: "Movie title",
      dataIndex: "movieTitle",
      key: "title",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Theater",
      //dataIndex: 'theater',
      key: "theater",
      render: (record) => {
        return (
          <>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Theater"
            >
              <Option value="OGF" label="OGF">
                OGF
              </Option>
              <Option value="Savoi" label="Savoi">
                Savoi
              </Option>
              <Option value="Regal" label="Regal">
                Regal
              </Option>
            </Select>
          </>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "showTime",
      key: "time",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sub Total (LKR)",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => deleteTicket(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  let temp = 0;
  const totalX = subTotals.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    temp
  );
  console.log("sadadas", totalX);
  return (
    <div className="cart-main-component">
      <Card
        className="cartCard"
        title="Cart"
        headStyle={{ fontSize: 30, fontWeight: "bold", border: "none" }}
      >
        <Table dataSource={tickets} columns={columns} />
        <div className="total">
          <span style={{ fontSize: 16, fontWeight: "bold", marginRight: 50 }}>
            Total:
            {subTotals.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              temp
            )}{" "}
            LKR
          </span>
          <Popconfirm
            title="Are you sure to confirm?"
            onConfirm={() => {
              navigate(`/payment/${totalX}`);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Confirm </Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );
}
export default Cart;
