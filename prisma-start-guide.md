```
# yarn 프로젝트를 초기화합니다.

yarn init -y

# express, prisma, @prisma/client 라이브러리를 설치합니다.

yarn add express prisma @prisma/client

# nodemon 라이브러리를 DevDependency로 설치합니다.

yarn add -D nodemon

# 설치한 prisma를 초기화 하여, prisma를 사용할 수 있는 구조를 생성합니다.

npx prisma init
```

-   `prisma`는 우리가 **Prisma**를 터미널에서 사용할 수 있도록 도구를 설치하는 패키지입니다.
-   `@prisma/client`는 우리가 Node.js 에서 **Prisma**를 사용할 수 있게 해줍니다.
-   `nodemon`은 개발 코드가 변경되었을 때 자동으로 서버 재시작을 해주는 패키지입니다.
---
```
# nodemon 명령어

## 형식

nodemon <실행할 JavaScript 파일명>

## nodemon을 이용해 app.js 파일 실행하기

nodemon app.js

# package.json nodemon 스크립트 등록하기
```
---
```
// package.json

...

"scripts": {
"dev": "nodemon app.js"
},
```
---
```
Examples

  Set up a new Prisma project
  $ prisma init

  Generate artifacts (e.g. Prisma Client)
  $ prisma generate

  Browse your data
  $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  $ prisma migrate dev

  Pull the schema from an existing database, updating the Prisma schema
  $ prisma db pull

  Push the Prisma schema state to the database
  $ prisma db push

  Validate your Prisma schema
  $ prisma validate

  Format your Prisma schema
  $ prisma format

  Display Prisma version info
  $ prisma version

  Display Prisma debug info
  $ prisma debug
```
---
```
- `[prisma db push](https://www.prisma.io/docs/reference/api-reference/command-reference#db-push)`
    - `schema.prisma` 파일에 정의된 설정값을 실제 데이터베이스에 **반영(push)**합니다.
    - 내부적으로 `prisma generate`가 실행됩니다.
    - 데이터베이스 구조를 변경하거나 새로운 테이블을 생성할 수 있습니다.
- `[prisma init](https://www.prisma.io/docs/reference/api-reference/command-reference#init)`
    - Prisma를 사용하기 위한 초기 설정을 생성합니다.
    - 이 명령어를 실행하면 `schema.prisma` 파일과 같은 필요한 설정 파일들이 생성됩니다.
- `[prisma generate](https://www.prisma.io/docs/reference/api-reference/command-reference#generate)`
    - Prisma Client를 생성하거나 업데이트 합니다.
    - 대표적으로, `schema.prisma` 파일에 변경 사항이 생겼거나, 데이터베이스 구조가 변경되었을 때, 이 명령어를 사용해 **Prisma Client**를 최신 상태로 유지할 수 있습니다.
- `[prisma db pull](https://www.prisma.io/docs/reference/api-reference/command-reference#db-pull)`
    - 현재 연결된 데이터베이스의 구조를 `prisma.schema` 파일로 가져옵니다.**(pull)**
    - 데이터베이스에서 구조 변경이 발생했을 때, 이 명령어를 사용하면 **Prisma Schema**를 최신 상태로 유지할 수 있습니다.
    - 이후 `prisma generate` 명령어를 사용해 변경 사항을 Prisma Client에 반영할 수 있습니다.
```
