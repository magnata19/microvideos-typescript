import Category from "./category"
import { omit } from 'lodash'

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
})