/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { emptySplitAdminApi } from '../../../emptySplitAdminApi';

export interface PaymentListRes {
  has_more: boolean;
  data: [
    {
      id: string;
      amount: number;
      amount_capturable: number;
      amount_received: number;
      application: null;
      application_fee_amount: null;
      automatic_payment_methods: null;
      canceled_at: null;
      cancellation_reason: null;
      capture_method: string;
      client_secret: string;
      confirmation_method: string;
      created: number;
      currency: string;
      customer: {
        id: string;
        created: number;
        currency: string;
        email: string;
        invoice_prefix: string;
        name: string;
        phone: string;
      };
      description: string;
      invoice: string;
      payment_method: string;
      payment_method_types: string[];
      processing: null;
      receipt_email: null;
      review: null;
      setup_future_usage: null;
      shipping: null;
      source: null;
      statement_descriptor: null;
      statement_descriptor_suffix: null;
      status: string;
      transfer_data: null;
      transfer_group: null;
    },
  ];
}

export interface PaymentByIdData {
  id: string;
  object: 'payment_intent';
  amount: number;
  amount_capturable: 0;
  amount_received: 9900;
  application: null;
  application_fee_amount: null;
  automatic_payment_methods: null;
  canceled_at: null;
  cancellation_reason: null;
  capture_method: 'automatic';
  client_secret: 'pi_3O9pdGAY7xOMe4533q3JrBBf_secret_4N2gpfWACd57cFLQshC6edKs1';
  confirmation_method: 'automatic';
  created: number;
  currency: string;
  customer: {
    id: 'cus_Ov7ZmT38CWdpzC';
    object: 'customer';
    address: null;
    balance: 0;
    created: 1698756367;
    currency: 'usd';
    default_source: null;
    delinquent: false;
    description: null;
    discount: null;
    email: string;
    invoice_prefix: '7B32BAAA';
    invoice_settings: {
      custom_fields: null;
      default_payment_method: null;
      footer: null;
      rendering_options: null;
    };
    name: 'TriXee';
    phone: null;
    preferred_locales: [];
    shipping: null;
    tax_exempt: 'none';
    test_clock: null;
  };
  description: string;
  invoice: 'in_1O9ogBAY7xOMe4534JKjV5Bd';
  last_payment_error: null;
  latest_charge: 'ch_3O9pdGAY7xOMe45335XRdXcV';
  livemode: false;
  next_action: null;
  on_behalf_of: null;
  payment_method: {
    id: 'pm_1O7HKcAY7xOMe453o4dvbkwh';
    object: 'payment_method';
    billing_details: {
      address: {
        city: null;
        country: null;
        line1: null;
        line2: null;
        postal_code: null;
        state: null;
      };
      email: 'trixeenya@gmail.com';
      name: null;
      phone: null;
    };
    card: {
      brand: 'visa';
      checks: {
        address_line1_check: null;
        address_postal_code_check: null;
        cvc_check: 'pass';
      };
      country: 'US';
      exp_month: 11;
      exp_year: 2030;
      fingerprint: '04fUGuToELV8G5uq';
      funding: 'credit';
      generated_from: null;
      last4: '4242';
      networks: {
        available: ['visa'];
        preferred: null;
      };
      three_d_secure_usage: {
        supported: true;
      };
      wallet: null;
    };
    created: 1698756366;
    customer: 'cus_Ov7ZmT38CWdpzC';
    livemode: false;
    metadata: {};
    type: 'card';
  };
  payment_method_configuration_details: null;
  payment_method_options: {
    card: {
      installments: null;
      mandate_options: null;
      network: null;
      request_three_d_secure: 'automatic';
    };
  };
  payment_method_types: string[];
  processing: null;
  receipt_email: null;
  review: null;
  setup_future_usage: null;
  shipping: null;
  source: null;
  statement_descriptor: null;
  statement_descriptor_suffix: null;
  status: string;
  transfer_data: null;
  transfer_group: null;
}

const serviceRoute = ApiRoutes.PAYMENTS;

export const paymentsApi =
  emptySplitAdminApi.injectEndpoints({
    endpoints: (builder) => ({
      getPayments: builder.query<
        PaymentListRes,
        {
          limit: number;
          startAfter?: string;
          endBefore?: string;
        }
      >({
        query: (body: {
          limit: number;
          startAfter?: string;
          endBefore?: string;
        }) => ({
          url:
            serviceRoute +
            `?limit=${body.limit}${
              body.startAfter
                ? `&startAfter=${body.startAfter}`
                : ''
            }${
              body.endBefore
                ? `&endBefore=${body.endBefore}`
                : ''
            }`,
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.payouts],
      }),
      getPaymentById: builder.query<
        PaymentByIdData,
        {
          payoutId: number;
        }
      >({
        query: (body: { payoutId: number }) => ({
          url: serviceRoute + `/${body.payoutId}`,
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.payouts],
      }),
    }),
  });

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
} = paymentsApi;
