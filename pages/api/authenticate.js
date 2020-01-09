import fetch from "isomorphic-unfetch";
import https from "https";

export default async (req, res) => {
  const authorizationCode = req.query.code;
  const url = `${process.env.BASE_URL}/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`;
  let tokens;
  try {
    const options = {
      method: "POST",
      agent: new https.Agent({
        rejectUnauthorized: false
      })
    };

    tokens = await fetch(url, options);
    tokens = await tokens.json();
  } catch (error) {
    res.status(401);
    return;
  }
  res.status(200).json(tokens);
};
