import { InMemorySearchableRepository } from "@seedwork/domain/repository/in-memory.repository";
import Category from "category/domain/entitites/category";
import CategoryInterface from "category/domain/repository/category.repository";

export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryInterface {
  protected applyFilter(items: Category[], filter: string | null): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

}