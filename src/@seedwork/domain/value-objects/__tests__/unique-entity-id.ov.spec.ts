import InvalidUuidError from '../../../errors/invalid-uuid.error'
import { validate as uuidValidate } from 'uuid'
import UniqueEntityId from '../unique-entity-id.ov'

const spyOnValidate = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe('UniqueEntityId Unit Tests', () => {

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  beforeEach(() => {
    validateSpy.mockClear();
  })
  it('should throw an error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('sada')).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept uuid passed in constructor', () => {
    const uuid = '32a80050-7417-4233-83ea-4effd6727aca'
    const uniqueUuid = new UniqueEntityId(uuid)
    expect(uniqueUuid.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled();
  })

  it('should accept without uuid passed in constructor', () => {
    const uniqueUuid = new UniqueEntityId();
    expect(uuidValidate(uniqueUuid.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  })
})
