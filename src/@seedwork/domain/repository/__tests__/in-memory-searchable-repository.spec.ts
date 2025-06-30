import Entity from '../../../../@seedwork/domain/entity/entity';
import { InMemorySearchableRepository } from "../in-memory.repository";

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

    })
  })

  describe('applySort method', () => {

  })

  describe('applyPaginate method', () => {

  })

  describe('search method', () => {

  })
})
