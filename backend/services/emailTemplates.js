function orderNotificationHtml(order, user) {
  const itemRows = order.items
    .map(
      (i) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${i.title}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">Rs. ${i.price.toFixed(2)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">Rs. ${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#111">
    <h2 style="border-bottom:2px solid #111;padding-bottom:8px">New Order Received</h2>
    <p><b>Order ID:</b> ${order._id}</p>
    <p><b>Customer:</b> ${user.name} (${user.email})</p>
    <p><b>Phone:</b> ${order.shippingAddress.phone}</p>
    <p><b>Ship to:</b> ${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}</p>
    ${order.shippingAddress.notes ? `<p><b>Notes:</b> ${order.shippingAddress.notes}</p>` : ""}
    <table style="width:100%;border-collapse:collapse;margin-top:16px">
      <thead>
        <tr style="background:#f4f4f4">
          <th style="padding:8px;text-align:left">Item</th>
          <th style="padding:8px">Qty</th>
          <th style="padding:8px;text-align:right">Price</th>
          <th style="padding:8px;text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <p style="text-align:right;margin-top:16px"><b>Subtotal:</b> Rs. ${order.subtotal.toFixed(2)}</p>
    <p style="text-align:right"><b>Shipping:</b> Rs. ${order.shipping.toFixed(2)}</p>
    <p style="text-align:right;font-size:18px"><b>Total:</b> Rs. ${order.total.toFixed(2)}</p>
  </div>`;
}

function orderConfirmationHtml(order, user) {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#111">
    <h2>Thanks for your order, ${user.name}!</h2>
    <p>Your order <b>#${order._id.toString().slice(-8)}</b> has been received.</p>
    <p>Total: <b>Rs. ${order.total.toFixed(2)}</b></p>
    <p>We'll contact you on ${order.shippingAddress.phone} to confirm delivery.</p>
    <p style="color:#666;font-size:13px">— InstrumentMania</p>
  </div>`;
}

module.exports = { orderNotificationHtml, orderConfirmationHtml };
