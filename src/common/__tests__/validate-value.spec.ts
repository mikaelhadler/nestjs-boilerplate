import { isValidCpfValue, isValidEmailValue } from '../validate-value'

describe('isValidCpfValue', () => {
  it('Should return false when pass nothing', () => {
    expect(isValidCpfValue()).toBe(false)
  })

  it('Should return false when pass string empty', () => {
    expect(isValidCpfValue('')).toBe(false)
  })

  it('Should return false when pass string bigger then 11', () => {
    expect(isValidCpfValue('123456789009999999')).toBe(false)
  })

  it('Should return true when exactly 11 without mask', () => {
    expect(isValidCpfValue('12345678900')).toBe(true)
  })

  it('Should return true when exactly 11 with mask', () => {
    expect(isValidCpfValue('123.456.789-00')).toBe(true)
  })
})

describe('isValidEmailValue', () => {
  it('Should return false when pass nothing', () => {
    expect(isValidEmailValue()).toBe(false)
  })

  it('Should return false when pass string empty', () => {
    expect(isValidEmailValue('')).toBe(false)
  })

  it('Should return true when pass correct email', () => {
    expect(isValidEmailValue('customer@email.com')).toBe(true)
  })
})
