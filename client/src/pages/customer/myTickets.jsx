import { Card } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import QRCode from "react-qr-code";
import "./movieBook.css";
export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const { request } = useRequest();
  const { user } = useUser();

  const getTickets = async () => {
    try {
      const res = await request.get(`booking/${user._id}`);
      if (res.status === 200) {
        console.log("tickets", res.data);
        setTickets(res.data);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTickets();
  }, [user]);
  return (
    <div>
      <center>
        <h1 style={{ margin: 20 }}> My Tickets</h1>
        <span>Scan QR code to view your ticket!</span>
      </center>

      <div className="tickets">
        {tickets.map((value) => (
          <Card style={{ width: 400 }} key={value._id}>
            <center>
              {" "}
              <QRCode value={value._id} size={150} />
            </center>{" "}
            <br />
            <p style={{ fontWeight: "bold" }}>Ticket Id: {value._id}</p>
            <p style={{ fontWeight: "bold" }}>Movie Name: {value.movieTitle}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
