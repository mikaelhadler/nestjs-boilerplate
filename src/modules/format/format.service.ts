import { Injectable } from '@nestjs/common'
import { repeat } from 'lodash'
import { DateFormats } from '../../common/enum-common'
import * as currencyFormatter from 'currency-formatter'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

@Injectable()
export class FormatService {
  getDate(date: string, fromFormat: any) {
    const d = fromFormat ? dayjs(date) : dayjs(date, fromFormat)
    if (d.isValid()) {
      return d
    }
    return dayjs()
  }

  getDateFormatted(date: any, fromFormat: string, toFormat: string): string {
    return this.getDate(date, fromFormat).format(toFormat)
  }

  toBackendFormat(value: string): string {
    return value.replace(/[()\s-.]/g, '')
  }

  mask(value: string): string {
    const length = value.length
    const maskLength = Math.floor(length / 2) || 1
    const maskStart = Math.ceil((length - maskLength) / 2)

    return value.substr(0, maskStart) + repeat('*', maskLength) + value.substr(maskStart + maskLength, length)
  }

  maskEmail(value: string): string {
    const index = value.indexOf('@')
    const start = this.mask(value.substr(0, index))
    const end = value.substr(index, value.length)
    return `${start}${end}`
  }

  maskZipCode(zipCode: string): string {
    return `${zipCode.slice(0, 5)}-${zipCode.slice(5, 8)}`
  }

  maskCpf(cpf: string): string {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`
  }

  removeMask(value: string): string {
    return value.replace(/[.-]/g, '').trim()
  }

  calculateAge(date: string): string {
    if (date) {
      const today = new Date()
      const birthDate = new Date(date)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age.toString()
    }
    return '-'
  }

  getDateFormat(date: any, format: string): string {
    return this.getDate(date, false).format(format)
  }


  getAmountFormattedNoCurrency(value: number): string {
    const currencyFormatted = value ? currencyFormatter.format(value, { code: 'BRL' }) : ''
    return currencyFormatted.replace('R$', '').trim()
  }

  getAmountFormatted(value: any, currency = 'BRL'): any {
    const valueFormatted = currencyFormatter.format(value, { code: currency })
    switch (currency) {
      case 'BRL':
        return currencyFormatter.format(value, { code: currency })
      case 'USD':
        return currencyFormatter.format(value, { code: currency }).replace('$', '$ ')
      default:
        return valueFormatted
    }
  }

  toUpperCaseFirstChar(value: string): string {
    const firstChar = value.substr(0, 1).toUpperCase()
    return firstChar.concat(value.substr(1).toLowerCase())
  }

  leftPad(value: any): string {
    const length = 2 - value.toString().length + 1
    return Array(length).join('0') + value
  }

  getMonthFormatted(date: string, fromFormat: string): string {
    const _date = this.getDate(date, fromFormat)
    const month = dayjs(_date).format('MMMM')
    return this.toUpperCaseFirstChar(month)
  }

  formatDateDefault(date: string): string {
    return this.getDateFormatted(date, DateFormats.FORMAT_YYYY_MM_DD, DateFormats.FORMAT_DD_MM_YYYY)
  }

  filterMostRecent(list: Array<any>): any {
    let element = list[0] || { createdDate: '' }
    let maxDate = new Date(element.createdDate)
    if (list) {
      list.forEach(el => {
        if (new Date(el.createdDate) > maxDate) {
          maxDate = new Date(el.createdDate)
          element = el
        }
      })
    }
    return element
  }

  formatCurrencyToBackend(value: string): number {
    if (value && typeof value === 'string') {
      const replacedDot = value.replace('.', '')
      const replacedComma = replacedDot.replace(',', '.')
      const amount = replacedComma.replace(/[^0-9.]+/g, '')
      return Number(amount)
    } else {
      return null
    }
  }
}
