import { describe, it, jest, expect } from '@jest/globals'
import Payment from '../src/events/payment'
import Business from '../src/observers/business'
import Marketing from '../src/observers/marketing'
import PaymentSubject from '../src/subjects/paymentSubject'

describe('Should notify the consumers when a payment ocurr', () => {
  it('Should notify the observers', () => {
    const observer = {
      update: jest.fn(),
    }

    const paymentSubject = new PaymentSubject()

    paymentSubject.subscribe(observer)

    const data = 'hellow world'

    const expected = data

    paymentSubject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })

  it('Should not notify the unsubscribe observers', () => {
    const observer = {
      update: jest.fn(),
    }

    const secondObserver = {
      update: jest.fn(),
    }

    const paymentSubject = new PaymentSubject()

    paymentSubject.subscribe(observer)
    paymentSubject.subscribe(secondObserver)

    const data = 'hellow world'

    const expected = data

    paymentSubject.unsubscribe(secondObserver)

    paymentSubject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
    expect(secondObserver.update).not.toBeCalledWith(expected)
  })

  it('Should notify the subject when some payment occurs', () => {
    const paymentSubject = new PaymentSubject()

    const payment = new Payment(paymentSubject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    )

    const data = { userName: 'cesar', id: Date.now() }

    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
  })

  it('Should notify the all observers if a payment ocurrs', () => {
    const marketingObserver = new Marketing()

    const businessObserver = new Business()

    const paymentSubject = new PaymentSubject()

    const payment = new Payment(paymentSubject)

    paymentSubject.subscribe(marketingObserver)
    paymentSubject.subscribe(businessObserver)

    const marketingObserverSpy = jest.spyOn(
      marketingObserver,
      marketingObserver.update.name
    )

    const businessObserverSpy = jest.spyOn(
      businessObserver,
      businessObserver.update.name
    )

    const data = { userName: 'cesar', id: Date.now() }

    const expected = data

    payment.creditCard(data)

    expect(marketingObserverSpy).toBeCalledWith(expected)
    expect(businessObserverSpy).toBeCalledWith(expected)
  })
})
