import filterExceptions from '../filter-exceptions'

describe('filterExceptions', () => {
  it('should return filterExceptions response correctly - no message', () => {
    expect(filterExceptions('')).toEqual(undefined)
  })
})
