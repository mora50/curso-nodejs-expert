import { test, jest, describe, expect, beforeEach } from '@jest/globals'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'

describe('#RickAndMortyBRL - Adapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('Should return the character entity provided by BRL adapter', async () => {
    const BRLIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getDataFromJson.name)
      .mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()

    expect(result).toEqual([])

    expect(BRLIntegration).toHaveBeenCalled()
  })
})
