import React, { useRef, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MerchCard from "./merchCard";
import AddMerch from "./addMerch";
import "./merch.css";

function MerchPage() {
  const [merch, setMerch] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/merchandise/read`)
      .then((res) => res.json())
      .then((data) => setMerch(data));
  }, []);

  console.log(merch);

  if (!merch) {
    return <CircularProgress className="loading" />;
  } else {
    return (
      <>
        <div className="merchCard-container">
          {merch.map((item) => (
            <div className="merchCard">
              <MerchCard item={item} />
            </div>
          ))}
        </div>
        <AddMerch />
      </>
    );
  }
}

export default MerchPage;
