# Sistema de Validações - E2E Invest

## Visão Geral

Este sistema implementa validações robustas para os formulários de cadastro e login, seguindo os padrões brasileiros e incluindo um medidor de força de senha interativo.

## Funcionalidades Implementadas

### 1. Validações de Campos

#### Nome Completo
- ✅ Apenas letras (maiúsculas, minúsculas, acentos)
- ✅ Espaços permitidos
- ✅ Mínimo 6 caracteres
- ✅ Máximo 50 caracteres
- ✅ Nome e sobrenome obrigatórios
- ✅ Nomes proibidos bloqueados (teste, admin, usuario, senha, 123456)

#### CPF
- ✅ Formato aceito: 000.000.000-00 ou apenas números
- ✅ Validação de 11 dígitos
- ✅ Algoritmo de validação de CPF (dígitos verificadores)
- ✅ CPFs inválidos bloqueados (00000000000, 11111111111, etc.)
- ✅ Máscara automática durante digitação

#### E-mail
- ✅ Formato válido de e-mail
- ✅ Domínios conhecidos validados
- ✅ Aceita .com.br, .org, etc.
- ✅ Validação de domínio genérico para novos provedores

#### Celular
- ✅ Padrão brasileiro (DDD + 8 ou 9 dígitos)
- ✅ DDD válido (11-99)
- ✅ Máscara automática: (11) 94701-3629
- ✅ Aceita formatos: 11947013629 ou (11) 94701-3629

#### Senha
- ✅ Mínimo 8 caracteres
- ✅ Pelo menos 1 letra maiúscula
- ✅ Pelo menos 1 letra minúscula
- ✅ Pelo menos 1 número
- ✅ Pelo menos 1 caractere especial (@#$%&*!^\-_=+.,;:)

### 2. Medidor de Força da Senha

#### Características
- 🎯 Barra visual colorida
- 🎯 Cálculo em tempo real
- 🎯 5 níveis de força
- 🎯 Mensagens orientativas
- 🎯 Cores dinâmicas

#### Níveis de Força
1. **Muito Fraca** (1 ponto) - Vermelho (#ff4444)
2. **Fraca** (2 pontos) - Laranja (#ff8800)
3. **Média** (3 pontos) - Amarelo (#ffaa00)
4. **Forte** (4 pontos) - Verde (#00aa00)
5. **Muito Forte** (5 pontos) - Verde Brilhante (#00ff00)

#### Cálculo de Pontos
- Comprimento: +1 (≥8 chars), +1 (≥12 chars)
- Tipos de caracteres: +1 para cada tipo (minúscula, maiúscula, número, especial)
- Bônus: +2 para senha completa com todos os requisitos

### 3. Validação em Tempo Real

#### Comportamento
- ✅ Validação durante digitação
- ✅ Mensagens de erro aparecem imediatamente
- ✅ Erros desaparecem quando campo é corrigido
- ✅ Validação no foco e perda de foco
- ✅ Campos ficam vermelhos quando inválidos

#### Feedback Visual
- 🎨 Borda vermelha para campos inválidos
- 🎨 Borda verde para campos válidos
- 🎨 Animação de shake para campos inválidos
- 🎨 Linha gradiente no foco
- 🎨 Transições suaves

### 4. Máscaras Automáticas

#### CPF
- Formata automaticamente: 123.456.789-01
- Aceita digitação com ou sem formatação

#### Celular
- Formata automaticamente: (11) 94701-3629
- Aceita digitação com ou sem formatação

## Arquivos do Sistema

### `validacoes.js`
- Lógica de validação
- Classes ValidadorCampo e MedidorSenha
- Configuração das regras de validação
- Máscaras de input

### `validacoes.css`
- Estilos para mensagens de erro
- Estilos para o medidor de força
- Animações e transições
- Estados visuais dos campos

### `index.html`
- Formulários atualizados com containers
- Links para arquivos de validação
- Estrutura HTML otimizada

### `script.js`
- Funções de login e cadastro atualizadas
- Integração com sistema de validação
- Manutenção de funcionalidades existentes

## Como Usar

### Para Desenvolvedores
1. Os campos são validados automaticamente
2. Use `validarFormularioCadastro()` para validar cadastro
3. Use `validarFormularioLogin()` para validar login
4. As validações são aplicadas em tempo real

### Para Usuários
1. Digite normalmente nos campos
2. As validações aparecem automaticamente
3. Corrija os erros conforme indicado
4. O medidor de senha mostra a força em tempo real

## Compatibilidade

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Responsivo para dispositivos móveis
- ✅ Funciona com JavaScript habilitado
- ✅ Não quebra funcionalidades existentes

## Manutenção

### Adicionar Nova Validação
1. Adicione regra em `VALIDACOES` no `validacoes.js`
2. Crie novo `ValidadorCampo` na inicialização
3. Adicione estilos CSS se necessário

### Modificar Regras Existentes
1. Edite as funções de validação em `VALIDACOES`
2. Ajuste mensagens de erro
3. Teste em diferentes cenários

## Testes Recomendados

### Cenários de Validação
- [ ] Nome com números (deve falhar)
- [ ] CPF inválido (deve falhar)
- [ ] E-mail mal formatado (deve falhar)
- [ ] Celular com DDD inválido (deve falhar)
- [ ] Senha fraca (deve falhar)
- [ ] Todos os campos válidos (deve passar)

### Funcionalidades
- [ ] Medidor de força da senha
- [ ] Máscaras automáticas
- [ ] Validação em tempo real
- [ ] Mensagens de erro
- [ ] Estados visuais dos campos

## Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador
2. Confirme se todos os arquivos estão carregados
3. Teste em navegador limpo
4. Verifique se JavaScript está habilitado

---

**Sistema desenvolvido para E2E Invest - Home Broker**
**Versão:** 1.0.0
**Data:** Dezembro 2024
