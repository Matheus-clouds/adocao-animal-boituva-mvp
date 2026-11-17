# Adoção Animal Boituva — MVP

Protótipo navegável para organizar a consulta de animais disponíveis e a demonstração de interesse em adoção, no contexto da Zoonoses de Boituva.

## Estado atual

Esta versão é um protótipo front-end estático e responsivo. Ela demonstra o fluxo público entre catálogo, perfil/formulário e confirmação. Não possui backend, autenticação funcional, banco de dados ou envio real de dados. As informações exibidas são dados de demonstração e os dados inseridos no formulário permanecem apenas no navegador durante a demonstração.

## Como executar

Abra `index.html` em um navegador atualizado. O protótipo não exige instalação de dependências nem conexão com a internet.

## Fluxo demonstrado

1. Consultar o catálogo e abrir o perfil de Luna.
2. Preencher nome e telefone obrigatórios, e-mail opcional e enviar interesse.
3. Ler a confirmação e voltar ao catálogo ou continuar a navegação.

O link “Acesso da equipe” informa que autenticação e gestão interna serão implementadas em etapa futura.

## Acessibilidade prevista

- Layout responsivo para celular e desktop.
- Campos com rótulos explícitos e mensagens anunciadas por tecnologia assistiva.
- Foco visível e controles principais com altura mínima de 44 px.
- Estados e confirmações identificados por texto e símbolo, além de cor.

## Estrutura

- `index.html`: telas e componentes do protótipo.
- `styles.css`: estilo responsivo e estados de foco.
- `app.js`: navegação simulada e validação local do formulário.
- `tela-1-inicio.png`, `tela-2-interesse.png` e `tela-3-resultado.png`: capturas estáticas das telas planejadas.

## Próxima evolução

Implementar o backend previsto em Python/Django, autenticação da equipe, persistência relacional, validação no servidor e os controles de segurança definidos no planejamento. Não use este protótipo para coletar dados reais.


