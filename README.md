# Senha Fácil

Programa de portfólio com tela para gerar senhas de 8 a 64 caracteres. Permite selecionar letras maiúsculas, minúsculas, números e símbolos. Cada grupo selecionado aparece pelo menos uma vez.

## Usar

Abra index.html em um navegador moderno e clique em Gerar senha. Os três arquivos index.html, gerador.js e interface.js devem ficar na mesma pasta. A geração funciona localmente, sem servidor ou dependências. O botão Copiar depende das permissões da área de transferência e pode exigir HTTPS ou localhost; se ele falhar, copie manualmente.

## Testes

Com Node.js 18 ou superior:

    node --test test_gerador.cjs

Cinco testes verificam tamanho, grupos selecionados, números, entradas inválidas, falta de fonte criptográfica e descarte de bytes fora da faixa. O teste de grupos usa 150 gerações. Isso não constitui auditoria de segurança.

## Implementação e limites

Usa crypto.getRandomValues, seleção de índices com rejeição de bytes e embaralhamento Fisher–Yates. Não usa Math.random. A garantia de pelo menos um caractere por grupo não implica distribuição uniforme entre todas as senhas possíveis. Não calcula nem promete uma pontuação de força.

Não usa rede, bibliotecas externas, armazenamento ou telemetria. A senha fica visível na tela e, ao clicar em Copiar, na área de transferência do dispositivo. Não é um gerenciador de senhas, não salva credenciais, não testa vazamentos e não tem auditoria independente. Senhas em imagens de demonstração são públicas e não devem ser usadas em contas reais.
