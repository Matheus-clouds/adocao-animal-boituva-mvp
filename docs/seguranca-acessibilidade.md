# Segurança e acessibilidade
## Controles de segurança planejados
A versão atual é um protótipo estático e não coleta nem envia dados para um servidor. Na implementação Django, as operações internas exigirão autenticação e autorização por ação. Senhas serão armazenadas por hash robusto fornecido pela plataforma, nunca em texto limpo, MD5 ou SHA-1.
Entradas serão validadas no cliente para orientar a pessoa e no servidor como controle obrigatório. Consultas usarão o ORM; conteúdos apresentados em templates serão escapados; erros públicos não revelarão detalhes internos. Segredos ficarão fora do código e serão fornecidos por variáveis de ambiente. Serão coletados somente nome, telefone e, opcionalmente, e-mail para o contato inicial.
## Requisito técnico de acessibilidade
No catálogo, formulário e tela de resultado: texto comum com contraste mínimo 4,5:1; controles principais com área de toque mínima de 44 × 44 pixels; operação por teclado com foco visível; rótulos associados aos campos; mensagens de erro com problema e correção; status e alertas comunicados por texto e símbolo, além de cor; ampliação até 200% sem perda de conteúdo ou função.
## Verificação prevista
A equipe verificará contraste, dimensões e foco. A validação percorrerá catálogo, formulário e confirmação, observando se as tarefas podem ser realizadas sem depender apenas da cor ou de interação com mouse. Esses requisitos são critérios de desenvolvimento; não representam uma certificação formal de conformidade.
