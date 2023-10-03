# :loudspeaker: Ouvidoria Prefeitura de São José dos Campos

## :mag: Visão Geral

O projeto *Ouvidoria Prefeitura de São José dos Campos* é uma aplicação que permite aos cidadãos reportar e visualizar reclamações relacionadas a problemas urbanos. O aplicativo consiste em um front-end interativo que exibe um mapa interativo onde os usuários podem marcar áreas de problemas e um back-end que armazena as informações das reclamações.


https://github.com/Brun0g/OpenLayers/assets/87041579/2fd1fa4d-1262-46f8-a0cd-dc2ea1dd5fb7


## :gear: Funcionalidades Principais

- Exibição de pontos de reclamações no mapa.
- Capacidade de reportar novas reclamações por meio de um formulário.
- Alternância entre diferentes camadas de mapa para diferentes visualizações.
- Interface de usuário amigável e responsiva.

## :computer: Tecnologias Utilizadas

- **Front-End**: OpenLayers, HTML, CSS, JavaScript.
- **Back-End**: Node.js, Express, PostgreSQL.
- **Banco de Dados**: PostgreSQL.
- **Bibliotecas Externas**: Font Awesome, Google Fonts, MDB.

## :rocket: Como Iniciar o Projeto

### :wrench: Configuração do Servidor (Back-End)

1. Clone o repositório do servidor para o seu computador.
2. Navegue até o diretório do servidor: `cd OpenLayers`
3. Instale as dependências do servidor: `npm install`
4. Configure o banco de dados PostgreSQL:
   - Abra o arquivo `db/app.js` e preencha as informações de conexão com o seu banco de dados PostgreSQL (usuário, senha, host, porta e nome do banco de dados).
5. Inicialize o servidor: `npm run dev`

O servidor estará em execução na porta 3000.

### :computer_mouse: Configuração do Cliente (Front-End)

1. Navegue até o diretório do cliente: `cd front-end` e `cd my-app`
2. Instale as dependências do cliente: `npm install`
3. Inicialize o cliente: `npm start`

O cliente estará em execução na porta 3000 e deve abrir automaticamente em seu navegador padrão.
