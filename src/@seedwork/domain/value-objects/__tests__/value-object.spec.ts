import ValueObject from "../value-object";

class StubValueObject extends ValueObject<any> {
}

describe('Value Object Unit Tests', () => {
  let stub = new StubValueObject('string value')
  it('should set value', () => {
    expect(stub.value).toBe('string value')
    console.log(`${stub}`)

    stub = new StubValueObject({ prop1: 'Nome' })
    expect(stub.value).toStrictEqual({ prop1: 'Nome' })
    console.log(`${new StubValueObject({ value: '25' })}`)

  })
  it('should convert to a string', () => {
    const date = new Date();
    const arrange = [
      { received: null, expected: "null" },
      { received: undefined, expected: "undefined" },
      { received: "", expected: "" },
      { received: 0, expected: "0" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: { prop1: 'value' }, expected: JSON.stringify({ prop1: 'value' }) },
    ]

    arrange.forEach(value => {
      stub = new StubValueObject(value.received);
      expect(stub + "").toBe(value.expected)
    })
  })
})