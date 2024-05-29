import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3030/users");
      setData(res.data);
    };
    fetch().catch((err) => {
      console.error("Error", err);
    });
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3030/users" + id)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <div className="d-flex m-20 flex-column justify-content-center align-items-center bg-light vh-100">
        <h1 className="p-10">List of users</h1>

        <div className="w-75 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <Link to="/create" className="btn btn-success">
              Add User
            </Link>
          </div>
          <div className="d-flex justify-content-end"></div>
          <table className="table table-stipend">
            <thead>
              <tr>
                <th>Name</th>
                <th>Eamil</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.password}</td>
                    <td>
                      <Link to={`/info/${d.id}`} className="btn btn-info me-2">
                        Info
                      </Link>
                      <Link
                        to={`/update/${d.id}`}
                        className="btn btn-warning me-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={(e) => handleDelete(d.id)}
                        className="btn btn-danger me-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
