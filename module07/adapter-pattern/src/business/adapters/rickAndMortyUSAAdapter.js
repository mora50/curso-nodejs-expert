import RickAndMortyUSA from '../integrations/rickAndMortyUSA'

export default class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML()
  }
}
