"use strict";var it,describe;module.link('mocha',{it(v){it=v},describe(v){describe=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



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

    console.log(result);

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
