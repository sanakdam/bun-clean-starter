import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getOrderDetailByIdQuery = `-- name: GetOrderDetailById :one
select
  o.id,
  o.order_no,
  o.created_at,
  o.status,
  o.awb_no,
  o.total_amount,
  o.shipping_fee,
  o.insurance_fee,
  o.discount,
  o.shipping_discount,
  o.shipping_method_id,
  acc.payment_bill_metadata,
  o.delivery_metadata,
  o.recipient_metadata,
  o.seller_metadata,
  sm.name,
  o.promo_ids
from
  orders o
  join account_transactions acc on o.checkout_id = acc.checkout_id
  join shipping_methods sm on o.shipping_method_id = sm.id
where
  o.id = $1`;

export interface GetOrderDetailByIdArgs {
    orderId: string;
}

export interface GetOrderDetailByIdRow {
    id: string;
    orderNo: string | null;
    createdAt: Date | null;
    status: string | null;
    awbNo: string | null;
    totalAmount: string | null;
    shippingFee: string | null;
    insuranceFee: string | null;
    discount: string | null;
    shippingDiscount: string | null;
    shippingMethodId: string | null;
    paymentBillMetadata: any | null;
    deliveryMetadata: any | null;
    recipientMetadata: any | null;
    sellerMetadata: any | null;
    name: string | null;
    promoIds: any | null;
}

export async function getOrderDetailById(client: Client, args: GetOrderDetailByIdArgs): Promise<GetOrderDetailByIdRow | null> {
    const result = await client.query({
        text: getOrderDetailByIdQuery,
        values: [args.orderId],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        orderNo: row[1],
        createdAt: row[2],
        status: row[3],
        awbNo: row[4],
        totalAmount: row[5],
        shippingFee: row[6],
        insuranceFee: row[7],
        discount: row[8],
        shippingDiscount: row[9],
        shippingMethodId: row[10],
        paymentBillMetadata: row[11],
        deliveryMetadata: row[12],
        recipientMetadata: row[13],
        sellerMetadata: row[14],
        name: row[15],
        promoIds: row[16]
    };
}

