/**
 * @description Data about a concrect Digimon
 * @class
 */
export class DigimonPage {
  /**
   * @description Return the information about a list of digimon and the current
   * page in the api
   * @param {int} nextPage - The next page where to search for digimon in the API.
   * @param {Digimon} digimonList - The list of digimon with whole information
   */

  constructor(nextPage, digimonList) {
    this.nextPage = nextPage;
    this.digimonList = digimonList;
  }
}

export class Digimon {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description =
      json.descriptions.filter((description) => {
        return description["language"] === "en_us";
      })[0]?.description ?? "";
    this.xAntibody = json.xAntibody;
    this.image = json.images[0].href;
    this.level = json.levels[0]?.level ?? -1;
    this.type = json.types[0]?.type ?? "";
    this.attribute = json.attributes[0]?.attribute ?? "";
  }
}

export class DetailedDigimon extends Digimon {
  constructor(json) {
    super(json);
    this.skills = [...json.skills].map((json) => new Skill(json));
  }
}

class Skill {
  constructor(json) {
    this.name = json.skill;
    this.description = json.description;
  }
}
