import fetch from "isomorphic-unfetch";
import https from "https";
import request from "request";

export default async (req, res) => {
  const subjectToken = req.headers["authorization"].replace("Bearer ", "");
  console.log("FETCH PROFILE", subjectToken);

  let tokens;
  try {
    const body = {
      subject_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiWmE0UC1PUXBvd0d6YW5ndlRGd0lzdz09Il0sImV4cCI6MTU3ODU4OTYzMiwiaXNzIjoiY29ubmVjdC5ibHVlc3BvcnRzLmxvY2FsIiwic3ViIjoiMDlkYjY4ZDItYjljMC00YzdjLWI4N2ItYTQ1MTc4MTY1MDc5In0.b3QLs1C7u_1pnXc-GrgiohCyiZ8GqfOtRAH-ep-L9eg",
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
      scope: "profile"
    };
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    // return new Promise((resolve, reject) => {
    //   request.post(
    //     `${process.env.BASE_URL}/oauth/token`,
    //     { form: body },
    //     function(err, httpResponse, body) {
    //       if (err) {
    //         reject(err);
    //       }
    //       if (httpResponse && httpResponse.statusCode === 200) {
    //         const json_response = JSON.parse(body);
    //         console.log({ json_response });
    //         res.status(200).send(json_response);
    //         resolve();
    //       }
    //     }
    //   );
    // });
    const params = new URLSearchParams();
    params.append("subject_token", body.subject_token);
    params.append("grant_type", body.grant_type);
    params.append("subject_token_type", body.subject_token_type);
    params.append("scope", body.scope);

    const options = {
      method: "POST",
      body: params,
      agent: new https.Agent({
        rejectUnauthorized: false
      })
    };

    tokens = await fetch(`${process.env.BASE_URL}/oauth/token`, options);
    tokens = await tokens.json();
    console.log("body", tokens);
  } catch (error) {
    console.error(error);
  }

  // res.status(200).send(tokens);
};
