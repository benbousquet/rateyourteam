import React, { useState } from "react";
import Search from "./screens/Search";
import ViewUser from "./screens/ViewUser";
import axios from "axios";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

let getUser = (id, setUser, setSearched) => {
  if (id === "") {
    return;
  }
  axios
    .get(`http://localhost/api/v1/user/${id}`)
    .then((res) => {
      setUser(res.data);
      setSearched(true);
    })
    .catch((err) => {
      axios
        .post(`http://localhost/api/v1/user`, {
          name: id,
          uplike: 0,
          downlike: 0,
        })
        .then((res) => {
          setUser(res.data);
          setSearched(true);
        });
    });
};

let uplike = (id, setUser) => {
  axios.get(`http://localhost/api/v1/uplike/${id}`).then((res) => {
    setUser(res.data);
  });
};

let downlike = (id, setUser) => {
  axios.get(`http://localhost/api/v1/downlike/${id}`).then((res) => {
    setUser(res.data);
  });
};

function App() {
  const [input, setInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Search
        inputState={[input, setInput]}
        userState={[user, setUser]}
        setSearched={setSearched}
        getUser={getUser}
      />
      {searched && (
        <ViewUser userState={[user, setUser]} rating={[uplike, downlike]} />
      )}
    </div>
  );
}

export default App;
