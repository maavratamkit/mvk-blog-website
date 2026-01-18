import { Cart } from '../types/Cart';

export interface DeliveryAddress {
  flatFloorStreet: string;
  mandalTownCity: string;
  district: string;
  state: string;
  pincode: string;
  phone?: string;
  landmark?: string;
}

export const formatWhatsAppMessage = (cart: Cart, address: DeliveryAddress): string => {
  let message = '🛍️ *New Order Request*\n\n';

  message += '📦 *Order Details:*\n';
  message += '─────────────────\n';

  cart.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Qty: ${item.quantity} × ₹${item.price.toLocaleString()}\n`;
    message += `   Subtotal: ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
  });

  message += '─────────────────\n';
  message += `💰 *Total Amount: ₹${cart.total.toLocaleString()}*\n\n`;

  message += '📍 *Delivery Address:*\n';
  message += '─────────────────\n';
  message += `${address.flatFloorStreet}\n`;
  message += `${address.mandalTownCity}\n`;
  message += `${address.district}, ${address.state}\n`;
  message += `PIN: ${address.pincode}\n`;

  if (address.landmark) {
    message += `Landmark: ${address.landmark}\n`;
  }

  if (address.phone) {
    message += `\n📱 *Contact: ${address.phone}*\n`;
  }

  message += '\n_Please confirm the order and provide delivery details._';

  return message;
};
