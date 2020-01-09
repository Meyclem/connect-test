import React from 'react'
import Head from 'next/head'

import '../styles/index.css';

const Home = () => (
  <div>
    <Head>
      <title>Connect test</title>
      <link rel="icon" href="/favicon.ico" />
      <div className="container">
        <div className="content-container">
          <a
            className="button-main" 
            href={`${process.env.BASE_URL}/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`} >
              Login
          </a>
        </div>
      </div>
    </Head>
  </div>
)

export default Home
