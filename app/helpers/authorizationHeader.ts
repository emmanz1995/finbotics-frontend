export const authorizationHeader = (): object => {
  const accessToken = JSON.parse(
    <string>localStorage.getItem('access_token')
  ).access_token;

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else return {};
};
