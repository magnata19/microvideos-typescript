import { InMemorySearchableRepository } from "@seedwork/domain/repository/in-memory.repository";
import Category from "category/domain/entitites/category";
import CategoryRepository from "category/domain/repository/category.repository";

export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
  protected async applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter(i => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    })
  }

}