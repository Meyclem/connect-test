import React, { useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

const Authenticate = ({ tokens }) => {
  useEffect(() => {
    if (tokens !== null && tokens.access_token !== typeof "undefined") {
      localStorage.setItem("access_token", tokens.access_token);
      return;
    }

    Router.replace("/notAuthenticated");
  }, [tokens]);

  return (
    <div>
      <h1>Authenticated!</h1>
    </div>
  );
};

Authenticate.getInitialProps = async ({ query }) => {
  const authorizationCode = query.code;

  const url = `http://localhost:8009/api/authenticate?code=${authorizationCode}`;

  let tokens;
  try {
    tokens = await fetch(url);
    tokens = await tokens.json();
  } catch (error) {
    return { tokens: null };
  }

  return { tokens };
};

export default Authenticate;
