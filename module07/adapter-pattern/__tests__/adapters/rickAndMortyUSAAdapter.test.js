import { test, jest, describe, expect, beforeEach } from '@jest/globals'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'

describe('#RickAndMortyUSA - Adapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('Should return the character entity provided by USA adapter', async () => {
    const USAIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()

    expect(result).toEqual([])

    expect(USAIntegration).toHaveBeenCalled()
  })
})
