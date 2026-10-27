const test = require('node:test');
const assert = require('node:assert/strict');
const { webcrypto } = require('node:crypto');
const { gerar } = require('./gerador.js');
const todas = {maiusculas:true,minusculas:true,numeros:true,simbolos:true};
test('tamanho e presença de cada grupo selecionado', () => {
  for (const tamanho of [8,16,64]) {
    for (let i=0;i<50;i++) {
      const senha=gerar(tamanho,todas,webcrypto);
      assert.equal(senha.length,tamanho);
      for (const regra of [/[A-Z]/,/[a-z]/,/[0-9]/,/[!@#$%&*+\-=?]/]) assert.match(senha,regra);
    }
  }
});
test('apenas números quando selecionados', () => assert.match(gerar(32,{numeros:true},webcrypto),/^\d{32}$/));
test('rejeita tamanho inválido e seleção vazia', () => {
  for (const n of [0,7,65,8.5,NaN]) assert.throws(()=>gerar(n,todas,webcrypto));
  assert.throws(()=>gerar(16,{},webcrypto));
});
test('exige fonte de aleatoriedade disponível', () => assert.throws(()=>gerar(16,todas,{})));
test('descarta bytes fora da faixa antes do módulo', () => {
  let chamadas=0;
  const fonte={getRandomValues(arr){arr[0]=chamadas++===0?255:0;return arr;}};
  assert.equal(gerar(8,{numeros:true},fonte),'00000000');
  assert.equal(chamadas,16);
});
