import React from "react";

const Home = () => {
  const checkoutHandler = async () => {
    const verification = async (response) => {
      const res = await fetch("http://localhost:4000/paymentVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM1OWJmMDg5OTY0MTcwZTUxNmM4OGQiLCJpYXQiOjE2OTA2NzIxODF9.Kh00b3NWsQHNKlMG8oSlWuXMAw7f30JvIjc-dxURoHs",
        },
        body: JSON.stringify(response),
      });
      const data = await res.json();
      console.log(data);
    };

    const response = await fetch("http://localhost:4000/getKey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data_response = await response.json();
    console.log(data_response);

    const res = await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: 9990,
      }),
    });
    const data = await res.json();
    console.log(data);

    var options = {
      key: data_response.key,
      amount: data.data.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",

      order_id: data.data.id,
      handler: function (response) {
        console.log(response);
        verification(response);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <>
      <button onClick={checkoutHandler}>Buy Now</button>
    </>
  );
};

export default Home;
