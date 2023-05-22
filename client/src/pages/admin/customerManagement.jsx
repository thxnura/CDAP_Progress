import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import "./admin.css";
import useRequest from "../../services/RequestContext";

const CustomerManagement = () => {
  const [customer, setCustomer] = useState([]);
  const { request } = useRequest();

  const getCustomer = async () => {
    try {
      const res = await request.get("customer");
      if (res.status === 200) {
        console.log("customer", res.data);
        setCustomer(res.data);
      } else {
        message.error("failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const data = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nic",
      dataIndex: "nic",
      key: "nic",
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
  ];
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <Table columns={data} data={customer} />
    </div>
  );
};

export default CustomerManagement;
