import { it, describe } from 'mocha';
import { expect } from 'chai';
import Person from '../src/person.js';

describe('Person entity test', () => {
  it('Given a data on a string it should return a formatted data, ', () => {
    const data = '1 Bike,Carro,Navio 1000 2020-10-10 2012-08-10';

    const result = Person.generateInstanceFromString(data);

    const expected = {
      id: '1',
      vehicles: ['Bike', 'Carro', 'Navio'],
      kmTraveled: '1000',
      from: '2020-10-10',
      to: '2012-08-10',
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('Given a data on a string it should return a formatted data (INTL), ', () => {
    const data = '1 Bike,Carro,Navio 1000 2020-10-10 2012-08-10';

    const person = new Person({
      id: '1',
      vehicles: ['Bike', 'Carro', 'Navio'],
      kmTraveled: '1000',
      from: '2020-10-10',
      to: '2012-08-10',
    });

    const result = person.formatted('pt-BR');

    const expected = {
      id: 1,
      vehicles: 'Bike, Carro e Navio',
      kmTraveled: '1.000 km',
      from: '10 de outubro de 2020',
      to: '10 de agosto de 2012',
    };

    expect(result).to.be.deep.equal(expected);
  });
});
