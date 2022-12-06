const { describe, it } = require('mocha')
const { expect } = require('chai')
describe('Person', () => {
  it('should generate a person instance from properties list', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ]

    const expect = {
      nome: 'Xuxa da Silva',
      nacionalidade: 'brasileira',
      estadoCivil: 'casada',
      cpf: 'CPF 235.743.420-12',
      rua: 'residente e domiciliada a Rua dos bobos',
      numero: 'zero',
      bairro: 'bairro Alphaville',
      cidade: 'São Paulo.',
    }
  })
})
