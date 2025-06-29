import { InMemorySearchableRepository } from "@seedwork/domain/repository/in-memory.repository";
import Category from "category/domain/entitites/category";
import CategoryInterface from "category/domain/repository/category.repository";

export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, any, any> implements CategoryInterface {

}