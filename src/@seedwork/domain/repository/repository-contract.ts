import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.ov";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
}

export class SearchParam {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1; ''
    }
  }

  get per_page() {
    return this._per_page
  }

  private set per_page(value: number) {
    let _per_page = +value;
    if (Number.isNaN(_per_page) || _per_page <= 0 || parseInt(_per_page as any) !== _per_page) {
      this._per_page = this._per_page;
    }
  }


  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value === null || this._sort === undefined || value === "" ? null : `${value}`;
  }


  get sort_dir() {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this._sort_dir) {
      this._sort_dir = null;
      return;
    }
    const dir = `${value.toLowerCase()}`;
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : 'desc';
  }


  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${value}`;
  }

}

export interface SearchableRepositoryInterface<E extends Entity,
  SearchOutput, SearchInput = SearchParam> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}