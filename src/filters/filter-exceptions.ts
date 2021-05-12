import messages from '../common/messages'

const isObject = objValue => objValue && typeof objValue === 'object' && objValue.constructor === Object

export const filterExceptions = (object: any) => {
  const _isObject = isObject(object)
  const { message } = object || ''
  const _messages = {
    ...messages.authenticate,
    ...messages,
  }

  if (_isObject) {
    return Object.values(_messages).find(msg => message === msg)
  } else {
    return Object.values(_messages).find(msg => object === msg)
  }
}

export default filterExceptions
