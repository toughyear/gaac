import type { NextApiRequest, NextApiResponse } from 'next';

const getAccessToken = async (code: string) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_APP_CLIENT_ID,
      client_secret: process.env.GITHUB_APP_CLIENT_ACCESS_TOKEN,
      code,
    }),
  });

  try {
    const data = await response.text();
    // parse the data to get the access token
    const params = new URLSearchParams(data);
    return params.get('access_token');
  } catch (error) {
    return null;
  }
};

// this function makes a request to the github api and exchanges the code for an access token
const githubTokenExchanger = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.query.code as string;
  const accessToken = await getAccessToken(code);
  res.status(200).json({ accessToken });
};

export default githubTokenExchanger;
