import { DataType, ISchema } from 'pg-mem';
import * as uuid from 'uuid';

// According ro https://www.rfc-editor.org/rfc/rfc4122.html#appendix-C
export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
export const OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
export const X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';

export function uuidOssp(schema: ISchema): void {
  const functionDefs = [
    {
      name: 'uuid_generate_v1',
      implementation: uuid.v1,
      returns: DataType.uuid,
      impure: true
    },
    {
      name: 'uuid_generate_v1mc',
      implementation: uuid.v1,
      returns: DataType.uuid,
      impure: true
    },
    {
      name: 'uuid_generate_v3',
      implementation: (namespace: string, name: string) => uuid.v3(name, namespace),
      returns: DataType.uuid,
      impure: true,
      args: [DataType.uuid, DataType.text]
    },
    {
      name: 'uuid_generate_v4',
      implementation: uuid.v4,
      returns: DataType.uuid,
      impure: true
    },
    {
      name: 'uuid_generate_v5',
      implementation: (namespace: string, name: string) => uuid.v5(name, namespace),
      returns: DataType.uuid,
      impure: true,
      args: [DataType.text, DataType.text]
    },
    {
      name: 'uuid_ns_url',
      implementation: () => URL,
      returns: DataType.uuid,
      impure: false
    },
    {
      name: 'uuid_ns_dns',
      implementation: () => DNS,
      returns: DataType.uuid,
      impure: false
    },
    {
      name: 'uuid_ns_oid',
      implementation: () => OID,
      returns: DataType.uuid,
      impure: false
    },
    {
      name: 'uuid_ns_x500',
      implementation: () => X500,
      returns: DataType.uuid,
      impure: false
    },
    {
      name: 'uuid_nil',
      implementation: () => uuid.NIL,
      returns: DataType.uuid,
      impure: false
    },
  ];
  functionDefs.forEach(f => schema.registerFunction(f));
}