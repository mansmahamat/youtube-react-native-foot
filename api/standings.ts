const apiKey = "";

const headers = {
  accept: "application/json",
  Authorization: apiKey
};

export const fetchStandingsByLeagueId = async (id: number) => {
  const url = `https://api.sportmonks.com/v3/football/standings/live/leagues/${id}?include=participant;form`;

  const requestOptions = {
    method: "GET",
    headers
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const json = await res.json();

  return json.data;
};
