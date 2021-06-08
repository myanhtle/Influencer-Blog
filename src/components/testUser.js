import { useState } from "react";
import Button from "@material-ui/core/Button";

function TestUsers() {
  const username = "aer6xrk";

  // function handleClickEight() {
  //   fetch(`http://localhost:8080/users/check/${username}`).then((res) =>
  //     res.json()
  //   );
  // }

  function handleClickNine() {
    fetch(`http://localhost:8080/users/read/${username}`).then((res) =>
      res.json()
    );
  }

  // function handleClickTen() {
  //   const userData = {
  //     username: "aer6xrk",
  //     name: "Abby Rieck",
  //     email: "aerieck6@verizon.net",
  //     password: "password",
  //   };

  //   fetch("http://localhost:8080/users/add", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   });
  // }

  return <Button onClick={() => handleClickNine()}>Hello</Button>;
}

export default TestUsers;
