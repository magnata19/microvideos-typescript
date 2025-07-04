import Category from "category/domain/entitites/category";
import Entity from "../entity/entity";
import { RepositoryInterface, SearchableRepositoryInterface, SearchParam, SearchResult, SortDirection } from "./repository-contract";
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

export abstract class InMemorySearchableRepository<
  E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E> {
  sortableFields: string[] = [];
  async search(props: SearchParam): Promise<SearchResult<E>> {// implementar paginacao, filtro e ordenacao
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(this.items, props.sort, props.sort_dir);
    const itemsPaginated = await this.applyPagination(itemsSorted, props.page, props.per_page);
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter
    });
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

  protected async applySort(items: E[], sort: string | null, sort_dir: SortDirection | null): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }
      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }
      return 0;
    })
  }

  protected async applyPagination(items: E[], page: SearchParam['page'], per_page: SearchParam['per_page']): Promise<E[]> {
    const start = (page - 1) * per_page; // 1 * 15 = 15 no caso da pagina ser 2
    const limit = start + per_page; // 15 + 15 = 30 exibe na pagina 2 os itens de 15 a 30
    return items.slice(start, limit);
  }

}