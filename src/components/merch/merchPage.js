import React, { useRef, useEffect, useState } from "react";
import MerchCard from "./merchCard";
import MerchForm from "./merchForm";

function MerchPage() {
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/merchandise/read`)
      .then((res) => res.json())
      .then((data) => setMerch(data));
  }, []);

  console.log(merch);

  return (
    <>
      {merch.map((item) => (
        <MerchCard item={item} />
      ))}
    </>
  );
}

export default MerchPage;
