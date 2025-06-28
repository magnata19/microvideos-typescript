import { SearchParam } from "./repository-contract"

describe("SearchParams Unit tests", () => {
  test('page prop', () => {
    const params = new SearchParam();
    console.log(params.page)
    expect(params.page).toBe(1);

    const arrange = [
      { page: null as any, expected: 1 },
      { page: undefined as any, expected: 1 },
      { page: 'fake' as any, expected: 1 },
      { page: '' as any, expected: 1 },
      { page: -1 as any, expected: 1 },
      { page: 5.5 as any, expected: 1 },
      { page: false as any, expected: 1 },
      { page: true as any, expected: 1 },
      { page: {} as any, expected: 1 },
      { page: 1 as any, expected: 1 },
      { page: 2 as any, expected: 2 },
    ]

    arrange.forEach((i) => {
      expect(new SearchParam({ page: i.page }).page).toBe(i.expected);
    })
  })

  test('per_page prop', () => {
    const params = new SearchParam();
    expect(params.per_page).toBe(15);

    const arrange = [
      { per_page: null as any, expected: 15 },
      { per_page: undefined as any, expected: 15 },
      { per_page: 'fake' as any, expected: 15 },
      { per_page: '' as any, expected: 15 },
      { per_page: -1 as any, expected: 15 },
      { per_page: 5.5 as any, expected: 15 },
      { per_page: false as any, expected: 15 },
      { per_page: true as any, expected: 15 },
      { per_page: {} as any, expected: 15 },
      { per_page: 1 as any, expected: 1 },
      { per_page: 2 as any, expected: 2 },
      { per_page: 10 as any, expected: 10 },
    ]

    arrange.forEach((i) => {
      expect(new SearchParam({ per_page: i.per_page }).per_page).toBe(i.expected);
    })
  })

  test('sort prop', () => {
    const params = new SearchParam();
    expect(params.sort).toBe(null);

    const arrange = [
      { sort: null as any, expected: null },
      { sort: undefined as any, expected: null },
      { sort: 'fake' as any, expected: 'fake' },
      { sort: '' as any, expected: null },
      { sort: -1 as any, expected: '-1' },
      { sort: 5.5 as any, expected: '5.5' },
      { sort: false as any, expected: 'false' },
      { sort: true as any, expected: 'true' },
      { sort: {} as any, expected: "[object Object]" },
      { sort: 1 as any, expected: '1' },
      { sort: 2 as any, expected: '2' },
      { sort: 10 as any, expected: '10' },
    ]

    arrange.forEach((i) => {
      expect(new SearchParam({ sort: i.sort }).sort).toBe(i.expected);
    })
  })

  test('sort_dir prop', () => {
    let params = new SearchParam();
    expect(params.sort_dir).toBeNull();

    params = new SearchParam({ sort: null });
    expect(params.sort_dir).toBeNull();

    params = new SearchParam({ sort: undefined });
    expect(params.sort_dir).toBeNull();

    params = new SearchParam({ sort: '' });
    expect(params.sort_dir).toBeNull();

    const arrange = [
      { sort_dir: null as any, expected: 'asc' },
      { sort_dir: undefined as any, expected: 'asc' },
      { sort_dir: 'fake' as any, expected: 'asc' },
      { sort_dir: '' as any, expected: 'asc' },
      { sort_dir: -1 as any, expected: 'asc' },
      { sort_dir: 5.5 as any, expected: 'asc' },
      { sort_dir: false as any, expected: 'asc' },
      { sort_dir: true as any, expected: 'asc' },
      { sort_dir: {} as any, expected: "asc" },
      { sort_dir: "asc" as any, expected: 'asc' },
      { sort_dir: 'ASC' as any, expected: 'asc' },
      { sort_dir: 'desc' as any, expected: 'desc' },
      { sort_dir: 'DESC' as any, expected: 'desc' },
    ]

    arrange.forEach((i) => {
      expect(new SearchParam({ sort: 'field', sort_dir: i.sort_dir }).sort_dir).toBe(i.expected);
    })
  })

  test('filter prop', () => {
    const params = new SearchParam();
    expect(params.filter).toBeNull()

    const arrange = [
      { filter: null as any, expected: null },
      { filter: undefined as any, expected: null },
      { filter: '' as any, expected: null },
      { filter: 'fake' as any, expected: 'fake' },
      { filter: -1 as any, expected: '-1' },
      { filter: 5.5 as any, expected: '5.5' },
      { filter: false as any, expected: 'false' },
      { filter: true as any, expected: 'true' },
      { filter: {} as any, expected: '[object Object]' },
      { filter: 1 as any, expected: '1' },
      { filter: 2 as any, expected: '2' },
      { filter: 10 as any, expected: '10' },
    ]

    arrange.forEach((i) => {
      expect(new SearchParam({ filter: i.filter }).filter).toBe(i.expected);
    })
  })
})