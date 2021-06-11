import React, { useRef, useEffect, useState } from "react";
import MerchCard from "./merchCard";
import AddMerch from "./addMerch";
import "./merch.css";

function MerchPage() {
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    console.log("oh");
    fetch(`http://localhost:8080/merchandise/read`)
      .then((res) => res.json())
      .then((data) => setMerch(data));
  }, []);

  console.log(merch);

  return (
    <>
      <div className="merchCard-container">
        {merch.map((item) => (
          <div className="merchCard">
            <MerchCard item={item} setMerch={setMerch} />
          </div>
        ))}
      </div>
      <AddMerch />
    </>
  );
}

export default MerchPage;
