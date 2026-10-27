(function (root) {
  'use strict';
  const grupos = { maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', minusculas: 'abcdefghijklmnopqrstuvwxyz', numeros: '0123456789', simbolos: '!@#$%&*+-=?' };
  function indice(maximo, fonte) {
    const limite = 256 - (256 % maximo);
    const byte = new Uint8Array(1);
    do { fonte.getRandomValues(byte); } while (byte[0] >= limite);
    return byte[0] % maximo;
  }
  function gerar(tamanho, opcoes, fonte = root.crypto) {
    if (!Number.isInteger(tamanho) || tamanho < 8 || tamanho > 64) throw new Error('Escolha um tamanho entre 8 e 64.');
    const ativos = Object.keys(grupos).filter(chave => opcoes[chave]).map(chave => grupos[chave]);
    if (!ativos.length) throw new Error('Selecione pelo menos um tipo de caractere.');
    if (!fonte || typeof fonte.getRandomValues !== 'function') throw new Error('Este navegador não oferece a fonte de aleatoriedade necessária.');
    const alfabeto = ativos.join('');
    const caracteres = ativos.map(grupo => grupo[indice(grupo.length, fonte)]);
    while (caracteres.length < tamanho) caracteres.push(alfabeto[indice(alfabeto.length, fonte)]);
    for (let i = caracteres.length - 1; i > 0; i--) {
      const j = indice(i + 1, fonte);
      [caracteres[i], caracteres[j]] = [caracteres[j], caracteres[i]];
    }
    return caracteres.join('');
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { gerar };
  else root.Senhas = { gerar };
})(globalThis);
