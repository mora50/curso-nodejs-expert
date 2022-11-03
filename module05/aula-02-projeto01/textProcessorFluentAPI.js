class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= fala que vai extrar os dados que virao depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao para pegar maiusculo e minusculo)
    // :s{1} vai procurar o caracter literal do dois pontos seguindo de um espaco
    // tudo acima fica dentro de um paranteses para falar "vamos pegar dai para frente"

    // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
    // .*? pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    //$ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multline
    // i -> insensitive

    const matchRegex = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gim;

    const onlyPerson = this.#content.match(matchRegex);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
