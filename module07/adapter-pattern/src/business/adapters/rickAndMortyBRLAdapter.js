import RickAndMortyBRL from '../integrations/rickAndMortyBRL'

export default class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return RickAndMortyBRL.getDataFromJson()
  }
}
