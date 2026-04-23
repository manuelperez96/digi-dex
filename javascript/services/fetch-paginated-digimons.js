import { DigimonPage, Digimon } from "../domain/digimon.js";
const baseUrl = "https://digi-api.com/api/v1/digimon";

/**
 * @description A short version of data about a concrect Digimon
 * @class
 */
export class DigimonOverview {
  /**
   * @description Creates a new Digimon instance using a Json map.
   * @param {object} json - Have to be a json object, if not throw an exception
   */
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.image = json.image;
  }
}

/**
 * @description Fetches digimon paginated data from api.
 * @param {String} name - The name of the digimon to search for. If null, make a new search from index 0.
 * @param {int} page - The page where to fetch digimons in the api. If not provided, use 0.
 * @returns {Promise<DigimonPage>} A promise that resolves to the fetched data.
 */
export default async function getPaginatedDigimon(name, page) {
  const params = new URLSearchParams();
  params.append("pageSize", "20");
  params.append("page", page ?? 0);
  if (name !== "") {
    params.append("name", name);
  }

  console.log('page: ' + page);
  const response = await fetch(`${baseUrl}?${params}`, {
    method: "GET",
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Imposible to fetch data`);
  }

  const url = json.pageable.nextPage;
  let nextPage;

  if (url !== "") {
    const parsedUrl = new URL(url);
    const page = parsedUrl.searchParams.get("page");
    nextPage = page;
  } else {
    nextPage = 0;
  }

  if (json.content === undefined) {
    return new DigimonPage(0, []);
  }

  const digimonOverviewList = [...json.content].map(
    (json) => new DigimonOverview(json),
  );

  const digimonList = await Promise.all(
    digimonOverviewList.map(async (digimon) => {
      const response = await fetch(`${baseUrl}/${digimon.id}`, {
        method: "GET",
      });
      const json = await response.json();

      return new Digimon(json);
    }),
  );

  return new DigimonPage(nextPage, digimonList);
}
