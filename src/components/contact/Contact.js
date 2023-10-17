import React, { useState, useEffect } from "react";
import "./Contact.css";
const Contact = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const getUserDetailsHandler = async () => {
      const res = await fetch(
        "https://homestyle-ecommerce-backend.onrender.com/getUserDetails",
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        setDetails({
          ...details,
          fullName: data.data.fullName,
          email: data.data.email,
        });
      }
      if (data.status === 500) {
        alert(data.message);
      }
    };
    getUserDetailsHandler();
  }, []);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/sendMessage",
      {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await res.json();
    if (data.status === 200) {
      alert(data.message);
      setDetails({
        ...details,
        subject: "",
        message: "",
      });
    } else if (data.status === 401) {
      alert("Please sign in before sending your message!");
    } else {
      alert(data.message);
    }
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="contactOuterDiv">
        <div className="contactInnerDiv">
          <h1 className="contactHeading">Let's Connect</h1>
          <p className="contactPara">
            Use this form to connect with us. Your inquiries and feedback are
            important to us!
          </p>
          <br />
          <br />
          <form className="contactForm" onSubmit={sendMessageHandler}>
            <div>
              <input
                type="text"
                name="fullName"
                value={details.fullName}
                onChange={inputHandler}
                placeholder="Name"
                className="contactInputFields"
              />
              <br />
              <input
                type="text"
                name="email"
                value={details.email}
                onChange={inputHandler}
                placeholder="Email ID"
                className="contactInputFields"
              />
              <br />
              <input
                type="text"
                name="subject"
                value={details.subject}
                onChange={inputHandler}
                placeholder="Subject"
                className="contactInputFields"
              />
              <br />
              <textarea
                name="message"
                value={details.message}
                onChange={inputHandler}
                placeholder="Message"
                className="contactInputFields contactTextArea"
                rows="4"
              />
              <br />
              <input type="submit" value="Send" className="contactSubmit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
