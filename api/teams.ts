const apiKey = "";

const headers = {
  accept: "application/json",
  Authorization: apiKey
};

export const fetchTeamById = async (id: number) => {
  const url = `https://api.sportmonks.com/v3/football/teams/${id}?include=players.player`;

  const requestOptions = {
    method: "GET",
    headers
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();

  return json.data.players;
};
