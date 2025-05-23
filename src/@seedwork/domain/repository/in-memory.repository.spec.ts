import NotFoundError from "../../errors/not-found.error";
import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.ov";
import InMemoryRepository from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number
}

class StubEntity extends Entity<StubEntityProps> { }

export class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe("InMemoryRepository unit test", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  })

  it("should insert a entity", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 5 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  })

  it('should throws an error when entity not found', () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found by id: fake id`))
  })

  it('should throws an error when entity not found with uuid', () => {
    expect(repository.findById(new UniqueEntityId('0d127c45-a01e-4c8d-8dd5-3a470a8aee33'))).rejects.toThrow(
      new NotFoundError(`Entity not found by id: 0d127c45-a01e-4c8d-8dd5-3a470a8aee33`))
  })

  it('should find by id', async () => {
    const entity = new StubEntity({ name: "Davidson", price: 5 });
    await repository.insert(entity);
    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  })

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'Davidson', price: 5 });
    await repository.insert(entity);
    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  })

  it('should updates an entity', async () => {
    const entity = new StubEntity({ name: 'Davidson', price: 5 });
    await repository.insert(entity);
    const entityUpdated = new StubEntity({ name: 'Davidson Pacifico', price: 10 }, entity.uniqueEntityId);
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  })

  it('should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'Davidson', price: 5 });
    expect(repository.update(entity)).rejects.toThrow(`Entity not found by id: ${entity.id}`);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([]);
  })

  it('should throw error on delete when entity not found', async () => {
    expect(repository.delete('fake id')).rejects.toThrow(`Entity not found by id: fake id`);

    const entities = await repository.findAll();
    expect(repository.findById(new UniqueEntityId('0d127c45-a01e-4c8d-8dd5-3a470a8aee33'))).rejects.toThrow(
      new NotFoundError(`Entity not found by id: 0d127c45-a01e-4c8d-8dd5-3a470a8aee33`))
    expect(entities).toStrictEqual([]);
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Davidson', price: 5 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
    expect(repository.items).toStrictEqual([]);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
    expect(repository.items).toStrictEqual([]);



  })
})