const { newDb } = require('pg-mem');
const { uuidOssp } = require('../dist');
const { URL, DNS, OID, X500 } = require('../dist/uuid-ossp');
const uuid = require('uuid');

const x = '[0-9a-f]';
const uuidPattern = version => new RegExp(`^[\\da-f]{8}-[\\da-f]{4}-${version}[\\da-f]{3}-[\\da-f]{4}-[\\da-f]{12}$`)

describe('uuid-ossp', () => {
  let db;
  beforeAll(() => {
    db = newDb();
    db.registerExtension('uuid-ossp', uuidOssp);
    db.public.none('create extension "uuid-ossp"');
  });

  it(`should support uuid_generate_v1()`, () => {
    const { id } = db.public.one('select uuid_generate_v1() id');
    expect(id).toMatch(uuidPattern(1));
  });

  it(`should support uuid_generate_v1mc()`, () => {
    const { id } = db.public.one('select uuid_generate_v1mc() id');
    expect(id).toMatch(uuidPattern(1));
  });

  it(`should support uuid_generate_v3()`, () => {
    const { id } = db.public.one(`select uuid_generate_v3('b84a7e50-be9f-11ec-94e9-51f6b7c8acb8'::uuid, 'example.com') id`);
    expect(id).toMatch(uuidPattern(3));
  });

  it(`should support uuid_generate_v4()`, () => {
    const { id } = db.public.one('select uuid_generate_v4() id');
    expect(id).toMatch(uuidPattern(4));
  });

  it(`should support uuid_generate_v5()`, () => {
    const { id } = db.public.one(`select uuid_generate_v5('b84a7e50-be9f-11ec-94e9-51f6b7c8acb8'::uuid, 'example.com') id`);
    expect(id).toMatch(uuidPattern(5));
  });

  it(`should support uuid_nil()`, () => {
    const { id } = db.public.one('select uuid_nil() id');
    expect(id).toBe('00000000-0000-0000-0000-000000000000');
  });

  it(`should support uuid_ns_url()`, () => {
    const { id } = db.public.one('select uuid_ns_url() id');
    expect(id).toBe(URL);
  });

  it(`should support uuid_ns_dns()`, () => {
    const { id } = db.public.one('select uuid_ns_dns() id');
    expect(id).toBe(DNS);
  });

  it(`should support uuid_ns_oid()`, () => {
    const { id } = db.public.one('select uuid_ns_oid() id');
    expect(id).toBe(OID);
  });

  it(`should support uuid_ns_x500()`, () => {
    const { id } = db.public.one('select uuid_ns_x500() id');
    expect(id).toBe(X500);
  });
});