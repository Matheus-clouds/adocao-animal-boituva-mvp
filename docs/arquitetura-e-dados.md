# Arquitetura e modelo de dados planejados
## Arquitetura
A aplicação completa será um monólito em camadas, organizado no padrão Model-View-Template (MVT) do Django. Templates e CSS apresentarão as telas; views tratarão requisições e regras do fluxo; models representarão os dados e a persistência. A separação mantém o escopo compreensível para desenvolvimento individual sem introduzir serviços distribuídos.
## Tecnologias planejadas
- Python 3.14 e Django 5.2 LTS para a aplicação web responsiva.
- PostgreSQL 18 para persistência relacional hospedada.
- Django Forms e ORM para validar dados no servidor e executar consultas seguras.
Estas tecnologias descrevem a arquitetura planejada. A versão atual deste repositório é HTML, CSS e JavaScript estáticos, sem backend.
## Entidades principais
### Animal
id (chave primária), nome, espécie, porte, idade, descrição, status (disponível, em processo ou adotado), imagem opcional e data de criação.
### InteresseAdocao
id (chave primária), animal_id (chave estrangeira), nome e telefone obrigatórios, e-mail opcional, status e data de criação.
Um animal pode ter vários interesses; cada interesse pertence a um animal. O vínculo preserva o contexto da solicitação sem duplicar o perfil. Endereço e documentos não são coletados no fluxo inicial.
