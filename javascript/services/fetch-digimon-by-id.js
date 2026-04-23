import { DetailedDigimon } from "../domain/digimon.js";
const baseUrl = "https://digi-api.com/api/v1/digimon";

/**
 * @description Given a id fetches the corresponding digimon.
 * @param {String} id - The id of the digimon to search for.
 * @returns {Promise<Digimon>} A promise that resolves to the fetched data.
 */
export default async function fetchDigimonById(id) {
  const result = await axios.get(`${baseUrl}/${id}`);

  return new DetailedDigimon(result.data);
}
