import {cart} from '../../data/cart.js';
import {getProductId} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryoption.js';
import {formatCurrency} from '../utility/price.js';


export function renderPaymentSumary() {
    let productPriceInCents = 0;

    let shipppingPriceInCents  = 0;

    cart.forEach(item => {
        const product = getProductId(item.productId);
        productPriceInCents += product.priceInCents * item.quantity;

        const deliveryOption = getDeliveryOption(item.deliveryOptionId);

        shipppingPriceInCents = deliveryOption.priceInCents;
    });

    const totalBeforeTaxInCents = productPriceInCents + shipppingPriceInCents;
    const taxInCents = totalBeforeTaxInCents * 0.1;

    const totalInCents = totalBeforeTaxInCents + taxInCents;

    const paymentHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipppingPriceInCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxInCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalInCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> `;

        document.querySelector(".payment-summary").innerHTML = paymentHTML;
};