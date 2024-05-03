-- name: GetOrderDetailById :one
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
  o.id = @order_id;