import Category, { CategoryProperties } from "./category"
import { omit } from 'lodash'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.ov'

describe("Category Unit Test", () => {

  test("testing the constructor of category", () => {
    let category = new Category({
      name: "Davidson"
    });
    let props = omit(category.props, 'created_at');
    expect(props).toStrictEqual({
      name: "Davidson",
      description: null,
      is_active: true
    });

    let created_at = new Date();
    category = new Category({
      name: "Davidson",
      description: "Some description",
      is_active: false,
      created_at
    })
    expect(category.props).toStrictEqual({
      name: "Davidson",
      description: "Some description",
      is_active: false,
      created_at
    });

    category = new Category({
      name: "Davidson",
      description: "Other description",
    })
    expect(category.props).toMatchObject({
      name: "Davidson",
      description: "Other description"
    });

    category = new Category({
      name: "Davidson",
      is_active: true
    })
    expect(category.props).toMatchObject({
      name: "Davidson",
      is_active: true
    });

    created_at = new Date()
    category = new Category({
      name: "Davidson",
      created_at
    })
    expect(category.props).toMatchObject({
      name: "Davidson",
      created_at
    });

  })

  test('testing id field', () => {
    type CategoryType = {
      props: CategoryProperties,
      id?: UniqueEntityId
    }

    const data: CategoryType[] = [
      { props: { name: "Davidson" } },
      { props: { name: "Davidson" }, id: null },
      { props: { name: "Davidson" }, id: undefined },
      { props: { name: "Davidson" }, id: new UniqueEntityId() },
    ]

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  test("testing getter of name field", () => {
    const category = new Category({ name: "Davidson" });
    expect(category.name).toBe("Davidson");
  })
  test("testing getter and setter of field description", () => {
    let category = new Category({ name: "Davidson" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Davidson", description: "something" });
    expect(category.description).toBe("something")

    category['description'] = "other thing";
    expect(category.description).toBe("other thing");

    category['description'] = undefined;
    expect(category.description).toBeNull();
  })

  test('testing getter and setter of is_active field', () => {
    let category = new Category({ name: "Davidson" });
    expect(category.is_active).toBeTruthy()

    category = new Category({ name: "Davidson" });
    category['is_active'] = true;
    expect(category.is_active).toBe(true);

    category = new Category({ name: "Davidson", is_active: false });
    expect(category.is_active).toBeFalsy()

    category = new Category({ name: "Davidson", is_active: false });
    expect(category.is_active).toBe(false);
  })

  test('testing getter of created_at field', () => {
    let created_at = new Date();
    let category = new Category({ name: "Davidson" });
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Category({ name: "Davidson", created_at });
    expect(category.created_at).toBe(created_at)

  })
})