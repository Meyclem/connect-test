import React, { useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

const Authenticate = ({ tokens }) => {
  useEffect(() => {
    if (tokens !== null && tokens.access_token !== typeof "undefined") {
      localStorage.setItem("access_token", tokens.access_token);
      return;
    }

    // Router.replace("/notAuthenticated");
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

  let tokens, exchangeToken;
  try {
    tokens = await fetch(url);
    tokens = await tokens.json();
  } catch (error) {
    console.log("there is an error");
    return { tokens: null };
  }
  console.log("fetch profile");
  try {
    exchangeToken = await fetch(`http://localhost:8009/api/profile`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    });
    exchangeToken = await exchangeToken.json();
    console.log("EXCHANGE", exchangeToken);
  } catch (error) {
    console.log(error);
  }

  return { tokens };
};

export default Authenticate;
