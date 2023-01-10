import { test, jest, describe, expect } from '@jest/globals'
import axios from 'axios'
import { readFile } from 'fs/promises'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'

describe('#RickAndMortyUSA', () => {
  beforeEach(() => jest.clearAllMocks())
  test('Should return the character entity populated by xml', async () => {
    const response = await readFile('./__tests__/mocks/rick-and-morty.xml')

    const expected = [
      {
        gender: 'Male',
        id: 10,
        location: "Worldender's lair",
        name: 'Alan Rails',
        origin: 'unknown',
        species: 'Human',
        status: 'Dead',
        type: 'Superhuman (Ghost trains summoner)',
      },
    ]

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toMatchObject(expected)
  })

  test('Should return a empty list of characters', async () => {
    const response = await readFile(
      './__tests__/mocks/rick-and-morty-empty.xml'
    )

    const expected = []

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toMatchObject(expected)
  })
})
