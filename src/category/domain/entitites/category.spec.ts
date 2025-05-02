import Category from "./category"

describe("Test of category", () => {

  test("testing the constructor of category", () => {
    const category = new Category("Davidson");
    expect(category.name).toBe("Davidson");
    expect(category.name).toBeDefined()
  })
})