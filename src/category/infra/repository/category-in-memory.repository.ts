import InMemoryRepository from "@seedwork/domain/repository/in-memory.repository";
import Category from "category/domain/entitites/category";
import CategoryInterface from "category/domain/repository/category.repository";

export default class CategoryInMemoryRepository extends InMemoryRepository<Category> implements CategoryInterface {

}