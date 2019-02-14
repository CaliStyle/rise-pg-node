import * as changeCase from 'change-case'
import * as request from 'request-promise'

import {
  Billing,
  Country,
  Customer,
  CustomerAccount,
  Fee,
  Fraud,
  Invoice,
  Merchant,
  MerchantProcessor,
  Notification,
  NotificationMerchant,
  NotificationReseller,
  PaymentForm,
  RatePlan,
  RecurringPayment,
  Report,
  ReportMerchant,
  Reseller,
  ResellerMerchant,
  ResellerMerchantProcessor,
  ResellerSub,
  ResolutionCenter,
  Risk,
  Role,
  RoleMerchant,
  RoleReseller,
  Transaction,
  User,
  UserMerchant,
  UserReseller
} from './api'

import { validateConfig } from './validators'

export class RPG {
  public billing: Billing
  public country: Country
  public customer: Customer
  public customerAccount: CustomerAccount
  public fee : Fee
  public fraud : Fraud
  public invoice: Invoice
  public merchant: Merchant
  public merchantProcessor: MerchantProcessor
  public notification: Notification
  public notificationMerchant: NotificationMerchant
  public notificationReseller: NotificationReseller
  public paymentForm : PaymentForm
  public ratePlan: RatePlan
  public recurringPayment: RecurringPayment
  public report: Report
  public reportMerchant: ReportMerchant
  public reseller: Reseller
  public resellerMerchant: ResellerMerchant
  public resellerMerchantProcessor: ResellerMerchantProcessor
  public resellerSub: ResellerSub
  public resolutionCenter: ResolutionCenter
  public risk: Risk
  public role: Role
  public roleMerchant: RoleMerchant
  public roleReseller: RoleReseller
  public transaction: Transaction
  public user: User
  public userMerchant: UserMerchant
  public userReseller: UserReseller

  private _config: {
    apiKey?: string,
    username?: string,
    password?: string,
    transform?: boolean,
    debug?: boolean,
    sandbox?: boolean
  } = {}

  constructor(options: {
    apiKey?: string,
    username?: string,
    password?: string,
    transform?: boolean,
    debug?: boolean,
    sandbox?: boolean} = {}
  ) {

    // Set config
    this.config = options

    this.billing = new Billing(this)
    this.country = new Country(this)
    this.customer = new Customer(this)
    this.customerAccount = new CustomerAccount(this)
    this.fee = new Fee(this)
    this.fraud = new Fraud(this)
    this.invoice = new Invoice(this)
    this.merchant = new Merchant(this)
    this.merchantProcessor = new MerchantProcessor(this)
    this.notification = new Notification(this)
    this.notificationMerchant = new NotificationMerchant(this)
    this.notificationReseller = new NotificationReseller(this)
    this.paymentForm = new PaymentForm(this)
    this.ratePlan = new RatePlan(this)
    this.recurringPayment = new RecurringPayment(this)
    this.report = new Report(this)
    this.reportMerchant = new ReportMerchant(this)
    this.reseller = new Reseller(this)
    this.resellerMerchant = new ResellerMerchant(this)
    this.resellerMerchantProcessor = new ResellerMerchantProcessor(this)
    this.resellerSub = new ResellerSub(this)
    this.resolutionCenter = new ResolutionCenter(this)
    this.risk = new Risk(this)
    this.role = new Role(this)
    this.roleMerchant = new RoleMerchant(this)
    this.roleReseller = new RoleReseller(this)
    this.transaction = new Transaction(this)
    this.user = new User(this)
    this.userMerchant = new UserMerchant(this)
    this.userReseller = new UserReseller(this)

    // bind `this` context
    const methods = [
      'billing',
      'country',
      'customer',
      'customerAccount',
      'fee',
      'fraud',
      'invoice',
      'merchant',
      'merchantProcessor',
      'notification',
      'notificationMerchant',
      'notificationReseller',
      'paymentForm',
      'ratePlan',
      'recurringPayment',
      'report',
      'reportMerchant',
      'reseller',
      'resellerMerchant',
      'resellerMerchantProcessor',
      'resellerSub',
      'resolutionCenter',
      'risk',
      'role',
      'roleMerchant',
      'roleReseller',
      'transaction',
      'user',
      'userMerchant',
      'userReseller'
    ]
    // methods.forEach((cat) => {
    //   this[cat] = this[cat].bind(this)
    //   // Object.keys(this[cat]).forEach((key) => {
    //   //   this[cat][key] = this[cat][key].bind(this)
    //   // })
    // })
    return this
  }

  get config () {
    return this._config
  }

  /**
   * Configure RPG client
   * @name configure
   * @param {Object} options
   * @param {string} options.apiKey       api key
   * @param {string} options.username     username
   * @param {string} options.password     password
   * @param {bool}   options.transform    disable transformations
   * @param {bool}   options.debug        output verbose debug information
   * @param {bool}   options.sandbox      sandbox
   */
  set config(options: { apiKey?: string, username?: string, password?: string, transform?: boolean, debug?: boolean, sandbox?: boolean }) {
    // Validate that the config
    validateConfig.rpg(options)

    this._config.apiKey = options.apiKey || this.config.apiKey || null
    this._config.username = options.username || this.config.username || null
    this._config.password = options.password || this.config.password || null
    this._config.transform = options.transform !== false
    this._config.debug = options.debug || false
    this._config.sandbox = options.sandbox || false

    return
  }

  get requestUrl() {
    return this.config.sandbox ? 'https://api.uat.hellopayments.net' : 'https://api.uat.hellopayments.net'
  }

  /**
   * Return Method and Url
   * @param obj
   */
  composeUrl(obj) {
    const method = Object.keys(obj)[0]
    const url = `${this.requestUrl}${obj[method]}`
    return {url, method}
  }

  /**
   * Perform a request.
   * @name request
   * @param {*} body as json
   */
  request(reqUrl, body = {}, validation = null) {
    // console.log('brk config', this.config)
    // console.log('brk reqUlr', reqUrl)
    // console.log('brk body', body)
    // console.log('brk validation', validation)

    // If this request didn't pass validation
    if (validation instanceof Error) {
      return Promise.reject({
        'statusCodeError': '000',
        'isRPG': true,
        ...validation
      })
    }

    // Get the method and url from the request
    const { method, url } = this.composeUrl(reqUrl)

    const req: {headers?: any, method: string, url: string, strictSSL: boolean, json?: boolean, body?: any} = {
      headers: {
        Authorization: this.config.apiKey
      },
      method: method,
      url: url,
      strictSSL: true,
      json: true,
      body: body,
    }

    // request
    return request(req)
      .then((res) => {
        // if(res.response.result && res.response.result !== 1) {
        //   res.isRPG = true
        //   throw res
        // }
        // else {
        //   return res
        // }
        return res
      })
  }
}