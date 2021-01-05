import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./inputs.module.css";

export default function Inputs() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [cite, setCite] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/quote").then((res) => {
      setCite(res.data);
    });
  }, [cite]);

  const submitButton = () => {
    axios
      .post("http://localhost:3001/quote", {
        firstname: firstname,
        lastname: lastname,
        description: description,
      })
      .then(() => {
        alert("Quote send!");
      });
  };

  return (
    <div className={styles.main}>
      <h1>Quotes</h1>
      <div className={styles.form}>
        <label>Firstname</label>
        <input
          type="text"
          name="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label>Lastname</label>

        <input
          type="text"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <label>Description</label>

        <input
          type="textarea"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>

      <div className={styles.cite}>
        {cite.map((val) => {
          return (
            <div>
              <h3>
                {val.firstname} {val.lastname}
              </h3>
              <p>{val.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
