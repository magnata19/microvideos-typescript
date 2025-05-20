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
})