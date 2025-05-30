import Category from "category/domain/entitites/category";
import Entity from "../entity/entity";
import { RepositoryInterface, SearchableRepositoryInterface } from "./repository-contract";
import UniqueEntityId from "../value-objects/unique-entity-id.ov";
import NotFoundError from "../../errors/not-found.error";

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {

  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.items.findIndex(i => i.id === entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id)
    const index = this.items.findIndex(i => i.id === id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity not found by id: ${id}`)
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E, any, any> {
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}