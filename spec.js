const { expect } = require('chai');
const db = require('./db');

describe('My Application', ()=> {
    beforeEach(()=> db.syncAndSeed());
    describe('DataLayer', ()=> {
        describe('User Model', ()=> {
            it('there are 3 users', ()=> {
                const users = [];
                expect(users.length).to.equal(3);
            });
        });
    });
}); 