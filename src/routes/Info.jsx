import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Info() {
  const [info, setInfo] = useState([]);
  const { id } = useParams();

  /*useEffect(() =>{
    const fetch = async()=>{
      const res = await axios.get("http://localhost:3030/users" + id)
      setInfo(res.info)
    }
    fetch().catch((err)=>{
      console.error('Error', err)
    })
  }, [id]);*/

  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((res) => setInfo(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex  flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>Detail of users</h1>
      <div>
        <strong>Name: {info.name}</strong>
      </div>
      <div>
        <strong>Email: {info.email}</strong>
      </div>
      <div>
        <strong>Password: {info.password}</strong>
      </div>
      <Link to={`/update/${id}`} className="btn btn-warning">
        Edit
      </Link>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
}

export default Info;
