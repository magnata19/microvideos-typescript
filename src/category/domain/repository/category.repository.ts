import { SearchableRepositoryInterface, SearchParam as DefaultSearchParam, SearchResult as DefaultSearchResult } from "@seedwork/domain/repository/repository-contract";
import Category from "../entitites/category";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParam<Filter> { }

  export class SearchResult extends DefaultSearchResult<Category, Filter> { }

  export interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {
  }
}

export default CategoryRepository;