const baseUrl = "https://digi-api.com/api/v1/digimon";

/**
 * @description Fetches digimon paginated data from api.
 * @param {String} name - The name of the digimon to search for. If null, make a new search from index 0.
 * @param {int} page - The page where to fetch digimons in the api. If not provided, use 0.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 */
export default async function getPaginatedDigimon(name, page) {
  const params = new URLSearchParams();
  params.append("pageSize", "20");
  params.append("page", page ?? 0);
  if (name !== "") {
    params.append("name", name);
  }

  const response = await fetch(`${baseUrl}?${params}`, {
    method: "GET",
  })
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Imposible to fetch data`);
  }

  console.log(json);
}
