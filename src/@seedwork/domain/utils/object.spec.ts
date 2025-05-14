import { deepFreeze } from "./object"

describe('object unit test', () => {

  it('should not freeze a scalar value', () => {
    const str = deepFreeze("string");
    expect(typeof str).toBe("string");

    let bool = deepFreeze(false);
    expect(typeof bool).toBe("boolean")

    bool = deepFreeze(true);
    expect(typeof bool).toBe("boolean")
  })
  it('should be a immutable object', () => {
    const obj = deepFreeze({ prop1: 'value', deep: { prop2: 'value', prop3: new Date() } });
    expect(() => { (obj as any).prop1 = 'new value' })
      .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")

    expect(() => { (obj as any).deep.prop2 = 'new value' })
      .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  })
})