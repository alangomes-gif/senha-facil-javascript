'use strict';
const resultado = document.getElementById('senha');
const statusTexto = document.getElementById('status');
const copiar = document.getElementById('copiar');
let ultimaSenha = '';
document.getElementById('gerar').addEventListener('click', () => {
  try {
    const opcoes = {};
    for (const nome of ['maiusculas', 'minusculas', 'numeros', 'simbolos']) opcoes[nome] = document.getElementById(nome).checked;
    ultimaSenha = Senhas.gerar(Number(document.getElementById('tamanho').value), opcoes);
    resultado.textContent = ultimaSenha;
    statusTexto.textContent = '';
    copiar.disabled = false;
  } catch (erro) {
    ultimaSenha = '';
    resultado.textContent = 'Nenhuma senha gerada';
    statusTexto.textContent = erro.message;
    copiar.disabled = true;
  }
});
copiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(ultimaSenha);
    statusTexto.textContent = 'Senha copiada para a área de transferência.';
  } catch {
    statusTexto.textContent = 'Não foi possível copiar. Selecione e copie a senha manualmente.';
  }
});
