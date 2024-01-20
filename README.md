# Facilita_SGC - Sistema de Gerenciamento de Conteúdo

## Este sistema integra um backend Node.js com PostgreSQL e um frontend React para otimizar o gerenciamento de clientes e roteamento eficiente.

### Gerenciamento de Clientes:
* Listagem e filtragem simples por nome, email e telefone.
* Cadastro ágil de novos clientes.

### Otimização de Rotas:

* Coordenadas X e Y para cada cliente.
* Algoritmo de roteamento eficiente, partindo da empresa e retornando.
* Lista que exibe a ordem otimizada de visitação dos clientes em uma modal.

### Essa solução centraliza dados, facilita expansões e aprimora a eficiência operacional da empresa de limpeza residencial, desde o cadastro até a execução estratégica de rotas.
#
<br/>
<div>
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
</div>

<div>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
</div>

#

## Clonar o repositório

### Clone o repositório para a sua máquina local usando o seguinte comando no terminal:

```
git clone git@github.com:RicardoNunes23/Facilita_SGC.git

```

 Certifique-se de ter as permissões corretas e as chaves SSH configuradas.



## Rodando o Backend 



* Navegue até a pasta backend no terminal.
* Inicie o banco de dados PostgreSQL usando Docker:

```
docker-compose up

```


* Em outro terminal, instale as dependências do Prisma:

```
npm install @prisma/client

```

* Inicie o servidor NodeJs:

```
npm run dev

```
> Se ocorrer o erro `Error: listen EADDRINUSE: address already in use :::3333 `(a porta 3333 já está em uso), verifique os processos em execução com:

```
lsof -i :3333

```

> Encerre o processo utilizando a porta 3333 com:

```
kill -9 <PID>

```

> Em seguida, reinicie o servidor NodeJs:

```
npm run dev

```

>


## Rodando o Frontend

* Abra um novo terminal e vá até a pasta frontend.
* Instale os módulos e dependências:

```
npm install

```
* Inicie o servidor frontend:

```
npm start

```

# ✨ Resultado:
### O aplicativo estará acessível em http://localhost:3000.



### Agora, você deve ter o Facilita_SGC rodando localmente em sua máquina. Certifique-se de ter todas as dependências instaladas corretamente para uma experiência suave.

#


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/) v20.11.0
- [Postgress](https://www.prisma.io/) latest
- [React](https://pt-br.reactjs.org/) v18.2.0
- [Prisma](https://www.prisma.io/) v3.15.2
- [Docker](https://www.docker.com/) v20.10.24
- [GitHub](https://github.com/)
- [VScode](https://code.visualstudio.com/)

