# Requisitos do MVP
## Objetivo
Facilitar a consulta de animais disponíveis para adoção no contexto da Zoonoses de Boituva e organizar manifestações de interesse vinculadas a cada animal.
## Usuários e requisitos funcionais
- **RF-01 — Acesso da equipe:** exigir autenticação para operações internas de cadastro e atualização. O catálogo e o formulário público não exigem conta.
- **RF-02 — Cadastro de animal:** permitir à equipe cadastrar nome, espécie, porte, idade, descrição, imagem opcional e status inicial.
- **RF-03 — Atualização de animal:** permitir à equipe atualizar perfil e status entre disponível, em processo e adotado.
- **RF-04 — Catálogo público:** listar somente animais com status disponível e permitir abrir o perfil.
- **RF-05 — Interesse em adoção:** receber nome e telefone obrigatórios e e-mail opcional, vincular o interesse ao animal e confirmar o recebimento. Aceitar somente se o animal estiver disponível.
- **RF-06 — Filtros por espécie e porte:** desejável, fora do protótipo atual.
## Requisitos técnicos previstos
- Validar entradas no navegador para orientar a pessoa e obrigatoriamente no servidor na implementação Django.
- Proteger operações da equipe por autenticação e autorização.
- Minimizar dados pessoais: não solicitar endereço ou documento de identificação.
- Comunicar estados e erros com texto claro, sem depender apenas de cor.
## Estado da implementação
O repositório contém um protótipo front-end demonstrativo. Os requisitos de backend, autenticação e persistência ainda não estão implementados.
