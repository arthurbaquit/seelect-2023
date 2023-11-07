# Seelect-2023

Repositório com o projeto para ser usado no workshop de introdução a desenvolvimento web na SEELECT 2023.

Pasta `client` possui o código do frontend, desenvolvido em React/Typescript. Para subir a aplicação, basta rodar os seguintes comandos no terminal

```bash
cd client
yarn install
yarn start
```

e acessar a aplicação no browser `locahost:3000`.

Na pasta `server`, temos nosso backend desenvolvido em Golang, usando arquitetura hexagonal. Para subir a aplicação, em outro terminal, suba o docker do banco de dados

```bash
docker-compose up -d
```

Depois rode

```bash
cd server
go run main.go
```

Com isso, nosso servidor deve estar rodando no `localhost:8080`.
