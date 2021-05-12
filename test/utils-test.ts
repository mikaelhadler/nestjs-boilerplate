import { Observable } from 'rxjs'

/**
 * Funcao auxiliar que Spy uma chamada ao Core com retorno Promise.resolve()
 * @param {Object} core Servico que sera "spying"
 * @param {String} functionCore Nome da funcao que sera "spying"
 * @param {*} returnValue Retorno que sera aplicado na funcao
 */
export const mockResolveCore = (core: any, functionCore: string, returnValue = {}) => {
  return jest.spyOn(core, functionCore).mockImplementation(_ => {
    return Promise.resolve(returnValue)
  })
}

/**
 * Funcao auxiliar que Spy uma chamada ao Core com retorno Observable
 * @param {Object} core Servico que sera "spying"
 * @param {String} functionCore Nome da funcao que sera "spying"
 * @param {*} returnValue Retorno que sera aplicado na funcao
 */
export const mockResolveCoreObservable = (core: any, functionCore: string, returnValue = {}) => {
  return jest.spyOn(core, functionCore).mockImplementationOnce(
    () =>
      new Observable(obs => {
        obs.next(returnValue)
        obs.complete()
      }),
  )
}

/**
 * Funcao auxiliar que Spy uma chamada ao Core com retorno Promise.reject()
 * @param {Object} core Serviço que sera "spying"
 * @param {String} functionCore Nome da funcao que sera
 * @param {*} returnValue Retorno que sera aplicado na funcao
 */
export const mockRejectCore = (core: any, functionCore: string, returnValue = {}) => {
  return jest.spyOn(core, functionCore).mockImplementation(_ => {
    return Promise.reject(returnValue)
  })
}

/**
 * Funcao auxiliar que Spy uma chamada a API com retorno Promise.resolve()
 * @param {Object} api Servico que sera "spying"
 * @param {String} functionApi Nome da funcao que sera "spying"
 * @param {*} returnValue Retorno que sera aplicado na funcao
 */
export const mockResolveApi = (api: any, functionApi: string, returnValue = {}) => {
  const mockObservable = {
    toPromise: () => Promise.resolve(returnValue).then(data => data),
  }
  return jest.spyOn(api, functionApi).mockImplementation(_ => mockObservable)
}

/**
 * Funcao auxiliar que Spy uma chamada a API com retorno Promise.reject()
 * @param {Object} api Serviço que sera "spying"
 * @param {String} functionApi Nome da funcao que sera
 * @param {*} returnValue Retorno que sera aplicado na funcao
 */
export const mockRejectApi = (api: any, functionApi: string, returnValue = {}) => {
  const mockObservable = {
    toPromise: () => Promise.reject(returnValue),
  }
  return jest.spyOn(api, functionApi).mockImplementation(_ => mockObservable)
}
