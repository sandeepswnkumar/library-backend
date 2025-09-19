
# Step to create Migration

- Create migration:

`npx sequelize-cli migration:generate --name create-users`

- Run migration:
`npx sequelize-cli db:migrate`

- Create seed file

`npx sequelize-cli seed:generate --name demo-user`

- Add Data

```
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      { name: 'Sandeep', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
```

- Run seed:

`npx sequelize-cli db:seed:all`



- Initialize Your Project

mkdir my-app && cd my-app
npm init -y
npm install express @prisma/client dotenv
npm install --save-dev prisma


- Initialize Prisma
npx prisma init


-  Migrations (Create/Update Tables)
npx prisma migrate dev --name update-users

- Run Seeder
npx prisma db seed


-Run postgres in local
psql -U postgres
