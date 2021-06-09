import React, { useRef, useEffect, useState } from "react";
import MerchCard from "./merchCard";

function MerchPage() {
  const [merch, setMerch] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/merchandise/read`)
      .then((res) => res.json())
      .then((data) => setMerch(data));
    console.log(merch);
  }, []);

  return <div></div>;
}

export default MerchPage;
