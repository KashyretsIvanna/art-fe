/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { UserByIdRes } from '../../../types/user/user-by-id.dto';
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
      getPayoutById: builder.query<
        UserByIdRes,
        { payoutId: number }
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
  useGetPayoutByIdQuery,
} = paymentsApi;
