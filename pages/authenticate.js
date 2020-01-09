import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch'
import https from 'https';
import Router from 'next/router';

const Authenticate = ({ tokens }) => {

  useEffect(() => {
    if (tokens !== null && tokens.access_token !== typeof 'undefined') {
      localStorage.setItem('access_token', tokens.access_token);
      return;
    }

    Router.replace('/notAuthenticated');

  }, [tokens]);

  return (
    <div>
      <h1>Authenticated!</h1>
    </div>
  )
}

Authenticate.getInitialProps = async ({ query }) => {
  const authorizationCode = query.code;
  
  const url = `${process.env.BASE_URL}/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`;

  let tokens
  try {
    const options = {
      method: 'POST',
      agent: new https.Agent({
        rejectUnauthorized: false
      })
    };

    tokens = await fetch(url, options);
    tokens = await tokens.json();
  } catch (error) {
    return { tokens: null}
  }

  return { tokens }
}

export default Authenticate;
