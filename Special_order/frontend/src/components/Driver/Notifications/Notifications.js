import React, { useState, useEffect } from "react";
import axios from "axios";
// import './DriverNotification.css';

const URL = "http://localhost:5000/driver/notifications";

const fetchNotifications = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Notifications() {
  const [Notifications, setNotifications] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchNotifications().then((data) => setNotifications(data.Notifications || []));
  }, []);

  const acceptHandler = async (notificationId) => {
    try {
      await axios.post(`${URL}/accept`, { notificationId });
      window.alert("Order accepted!");
      fetchNotifications().then((data) => setNotifications(data.Notifications || []));
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const denyHandler = async (notificationId) => {
    try {
      await axios.post(`${URL}/deny`, { notificationId });
      window.alert("Order denied!");
      fetchNotifications().then((data) => setNotifications(data.Notifications || []));
    } catch (error) {
      console.error("Error denying order:", error);
    }
  };

  return (
    <div className="driver_notification_container">
      <h1>Driver Notifications</h1>
      <table className="table_details_driver">
        <thead>
          <tr className="driver_tbl_tr">
            <th className="driver_tbl_th">Order ID</th>
            <th className="driver_tbl_th">Contact Name</th>
            <th className="driver_tbl_th">Actions</th>
          </tr>
        </thead>
        {noResults ? (
          <div>
            <br />
            <h1 className="con_topic">
              No <span className="clo_us"> Notifications</span>{" "}
            </h1>
          </div>
        ) : (
          <tbody>
            {Notifications.map((item, index) => (
              <tr className="driver_tbl_tr" key={index}>
                <td className="driver_tbl_td">{item.orderId}</td>
                <td className="driver_tbl_td">{item.contactname}</td>
                <td className="driver_tbl_td">
                  <button
                    onClick={() => acceptHandler(item._id)}
                    className="btn_driver_accept"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => denyHandler(item._id)}
                    className="btn_driver_deny"
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Notifications;
