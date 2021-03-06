const supertest = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig');

describe('user routes', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
});

describe('it registers a new user', () => {
  it("won't add a new user without a token", async () => {
    const newConservationist = {
      id: 557,
      sub: 'blahdumblee',
      username: 'tralalalalala',
      email: 'tralala@lala.tra',
      roles: 'conservationist',

    };

    await supertest(server)
      .post('/api/users', newConservationist)
      .expect(401);
  });

  it('will not register a user with incomplete creds', async () => {
    const anotherNewConservationist = {
      sub: 'tu madre',
      username: 'votre maman',
    };

    await supertest(server)
      .post('/api/users', anotherNewConservationist)
      .expect(401);
  });
});
