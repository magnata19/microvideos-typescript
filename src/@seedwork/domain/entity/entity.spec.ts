import UniqueEntityId from "../value-objects/unique-entity-id.ov";
import Entity from "./entity";
import { validate as uuidValidate } from 'uuid';

class StubEntity extends Entity<{ prop1: string, prop2: number }> {

}

describe("Entity unit tests", () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'some value', prop2: 25 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange)
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  })

  it('should accept a valid uuid', () => {
    const arrange = { prop1: 'some value', prop2: 25 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  })

  it('should convert a entity to a JSON', () => {
    const arrange = { prop1: 'some value', prop2: 25 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange
    })
  })
})