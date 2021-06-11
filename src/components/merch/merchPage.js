
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useRef, useEffect, useState, useContext } from "react";
import MerchCard from "./merchCard";
import AddMerch from "./addMerch";
import "./merch.css";
import {UserContext} from "../../contexts/UserContext"

function MerchPage() {
  const [merch, setMerch] = useState(null);
  const {isAdmin} = useContext(UserContext)

  useEffect(() => {
    console.log("oh");
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
              <MerchCard item={item} setMerch={setMerch} />
            </div>
          ))}
        </div>
        {isAdmin && (<AddMerch />)}
      </>
    );
  }
}

export default MerchPage;
