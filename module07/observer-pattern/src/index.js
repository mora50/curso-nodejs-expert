import Payment from './events/payment.js'
import Business from './observers/business.js'
import Marketing from './observers/marketing.js'
import PaymentSubject from './subjects/paymentSubject.js'

const paymentSubject = new PaymentSubject()

const marketing = new Marketing()

paymentSubject.subscribe(marketing)

const business = new Business()

paymentSubject.subscribe(business)

const payment = new Payment(paymentSubject)

const data = {
  userName: 'cesar',
  id: Date.now(),
}

payment.creditCard(data)

paymentSubject.unsubscribe(marketing)

payment.creditCard(data)
