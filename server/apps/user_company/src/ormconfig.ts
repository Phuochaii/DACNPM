// module.exports = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
// username: 'postgres',
// password: '123456',
//   database: 'test_topcv',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

[
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'service_user',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  {
    name: 'company',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'service_user',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  // {
  //   name: 'company',
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: '123456',
  //   database: 'service_company',
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  //   synchronize: true,
  // },
];
