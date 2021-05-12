export const isValidCpfValue = (cpf = ''): boolean => {
  const re = /^\d{3}(\.)?\d{3}(\.)?\d{3}(-)?\d{2}$/
  return re.test(cpf)
}

/**
 * Validate email by regex
 * Reference https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 */
export const isValidEmailValue = (email = ''): boolean => {
  const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(email)
}
