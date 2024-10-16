import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import './Specialorderdis.css';
import Nav from "../../../Specialorder/Nav/Nav";

const URL = "http://localhost:5000/orders";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SpecialOrderDis() {
  // Fetch data
  const [Orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.Orders || []));
  }, []);

  // Delete Function
  const history = useNavigate();
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Driver Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Deleted successfully!");
        history("/driverdetails");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };

  // PDF Function
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Details Report",
    onAfterPrint: () => alert("Details Report Successfully Downloaded!"),
  });

  // Search Function
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.specialcol.filter((specialcol) =>
        Object.values(specialcol).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div>
      <Nav />
      <div className="children_div_admin">
        <div className="dash_button_set">
          <button
            className="btn_dash_admin"
            onClick={() => (window.location.href = "/adddriver")}
          >
            Add New Driver
          </button>

          <tr>
            <td>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              />
            </td>
            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Special Collection
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Contact Name</th>
                <th className="admin_tbl_th">Type of User</th>
                <th className="admin_tbl_th">Email</th>
                <th className="admin_tbl_th">Address</th>
                <th className="admin_tbl_th">List of Items</th>
                <th className="admin_tbl_th">Preferred Date</th>
                <th className="admin_tbl_th">Total Weight</th>
                <th className="admin_tbl_th">Total Amount</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br />
                <h1 className="con_topic">
                  No <span className="clo_us"> Found</span>{" "}
                </h1>
              </div>
            ) : (
              <tbody>
                {Orders.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.contactname}</td>
                    <td className="admin_tbl_td">{item.typeofuser}</td>
                    <td className="admin_tbl_td">{item.contactemail}</td>
                    <td className="admin_tbl_td">{item.address}</td>
                    <td className="admin_tbl_td">{item.listofitems}</td>
                    <td className="admin_tbl_td">{item.preferedtime}</td>
                    <td className="admin_tbl_td">{item.totalweight}</td>
                    <td className="admin_tbl_td">{item.totalamount}</td>
                    <td className="admin_tbl_td">
                      <Link
                        to={`/updateedriver/${item._id}`}
                        className="btn_dash_admin"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn_dash_admin_dlt"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default SpecialOrderDis;
