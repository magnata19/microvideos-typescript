import Entity from '../../../../@seedwork/domain/entity/entity';
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParam, SearchResult } from '../repository-contract';

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {
}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];
  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(i => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase()) || i.props.price.toString() === filter;
    })
  }
}

describe('InMemorySearchableRepository Unit test', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  })

  describe('applyFilter method', () => {
    it('should not filter items when filter is null', async () => {
      const items = [
        new StubEntity({ name: 'Item 1', price: 10 }),
        new StubEntity({ name: 'Item 2', price: 20 }),
      ]
      const spyFilter = jest.spyOn(items, 'filter');
      const itemsFiltered = await repository['applyFilter'](items, null);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    })

    it('should filter using filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 30 }),
        new StubEntity({ name: 'TEST', price: 40 }),
        new StubEntity({ name: 'FAKE', price: 40 }),
      ]
      const spyFilter = jest.spyOn(items, 'filter');
      let itemsFiltered = await repository['applyFilter'](items, 'TEST');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilter).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, '40');
      expect(itemsFiltered).toStrictEqual([items[1], items[2]]);
      expect(spyFilter).toHaveBeenCalledTimes(2);

      itemsFiltered = await repository['applyFilter'](items, 'nada-=aq');
      expect(itemsFiltered).toStrictEqual([]);
      expect(spyFilter).toHaveBeenCalledTimes(3);
      //ir para aula 21 no modulo de repositorio no google drive
    })
  })

  describe('applySort method', () => {
    it('should not sort items when sort is null', async () => {
      const items = [
        new StubEntity({ name: 'Item 1', price: 10 }),
        new StubEntity({ name: 'Item 2', price: 20 }),
      ]

      const spyFilterMethod = jest.spyOn(items, 'filter');
      let itemsFiltered = await repository['applySort'](items, null, null);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsFiltered = await repository['applySort'](items, 'price', 'asc');
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    })

    it('should sort items', async () => {
      const items = [
        new StubEntity({ name: 'Item 2', price: 20 }),
        new StubEntity({ name: 'Item 3', price: 20 }),
        new StubEntity({ name: 'Item 1', price: 10 }),
      ]

      let itemsFiltered = await repository['applySort'](items, 'name', 'asc');
      expect(itemsFiltered).toStrictEqual([
        items[2],
        items[0],
        items[1],
      ]);

      itemsFiltered = await repository['applySort'](items, 'name', 'desc');
      expect(itemsFiltered).toStrictEqual([
        items[1],
        items[0],
        items[2],
      ]);
    })
  })

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'Item 1', price: 10 }),
        new StubEntity({ name: 'Item 2', price: 20 }),
        new StubEntity({ name: 'Item 3', price: 20 }),
        new StubEntity({ name: 'Item 4', price: 20 }),
        new StubEntity({ name: 'Item 5', price: 20 }),
      ]

      let paginatedItems = await repository['applyPagination'](items, 1, 2);
      expect(paginatedItems).toStrictEqual([items[0], items[1]]);

      paginatedItems = await repository['applyPagination'](items, 2, 2);
      expect(paginatedItems).toStrictEqual([items[2], items[3]]);

      paginatedItems = await repository['applyPagination'](items, 3, 2);
      expect(paginatedItems).toStrictEqual([items[4]]);

      paginatedItems = await repository['applyPagination'](items, 4, 2);
      expect(paginatedItems).toStrictEqual([]);
    })
  })

  describe('search method', () => {
    it('should apply only paginate when another params are null', async () => {
      const entity = new StubEntity({ name: 'Item 1', price: 10 })
      const items = Array(16).fill(entity);
      repository.items = items;
      const result = await repository.search(new SearchParam({}));
      expect(result).toStrictEqual(new SearchResult({
        items: Array(15).fill(entity),
        total: 16,
        current_page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      }))
    })
  })
})
