import axios from 'axios'
import xml2js from 'xml2js'
import Character from '../../entities/character'
const URL =
  'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml'

export default class RickAndMortyUSA {
  static async getCharactersFromXML() {
    const { data } = await axios.get(URL)

    const {
      results: { element: results = [] },
    } = await xml2js.parseStringPromise(data, {
      explicitRoot: false,
      explicitArray: false,
    })

    const defaultFormat = Array.isArray(results) ? results : [results]

    return defaultFormat.map((character) => new Character(character))
  }
}
