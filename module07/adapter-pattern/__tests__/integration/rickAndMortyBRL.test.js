import { test, jest, describe, expect } from '@jest/globals'
import axios from 'axios'
import { readFile } from 'fs/promises'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'
import Character from '../../src/entities/character'

describe('#RickAndMortyBRL', () => {
  beforeEach(() => jest.clearAllMocks())
  test('Should return the character entity populated by json', async () => {
    const response = JSON.parse(
      await readFile('./__tests__/mocks/rick-and-morty.json')
    )

    const expected = response.results.map(
      (character) => new Character(character)
    )

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getDataFromJson()

    expect(result).toStrictEqual(expected)
  })

  test('Should return a empty list of characters', async () => {
    const response = JSON.parse(
      await readFile('./__tests__/mocks/rick-and-morty-empty.json')
    )

    const expected = response.results

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getDataFromJson()

    expect(result).toStrictEqual(expected)
  })
})
