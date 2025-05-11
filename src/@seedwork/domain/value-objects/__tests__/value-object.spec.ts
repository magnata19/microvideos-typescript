import ValueObject from "../value-object";

class StubValueObject extends ValueObject<any> {
}

describe('Value Object Unit Tests', () => {
  it('should set value', () => {
    let stub = new StubValueObject('string value')
    expect(stub.value).toBe('string value')

    stub = new StubValueObject({ prop1: 'Nome' })
    expect(stub.value).toStrictEqual({ prop1: 'Nome' })
  })
})