import React from 'react';

const ShippingAndDelivery: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Shipping and Delivery Policy</h1>
      <p className="text-sm mb-6">Effective Date: 08.16.2024</p>

      <h2 className="text-2xl font-bold mb-4">1. Order Processing and Shipping Time</h2>
      <p className="mb-6">
        <strong>Order Processing:</strong> All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
      </p>
      <p className="mb-6">
        <strong>Shipping Time:</strong> Shipping times may vary depending on your location. Typically, domestic shipments arrive within 3-7 business days. International shipping times can vary and may take 10-20 business days depending on the destination and customs clearance procedures.
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Shipping Costs</h2>
      <p className="mb-6">
        <strong>Domestic Shipping:</strong> We offer free standard shipping on all domestic orders above a certain amount. For orders below this amount, a flat rate of $5.99 will be applied.
      </p>
      <p className="mb-6">
        <strong>International Shipping:</strong> Shipping costs for international orders will be calculated at checkout based on the destination and the total weight of the package. Additional customs and import duties may apply, and these are the responsibility of the customer.
      </p>

      <h2 className="text-2xl font-bold mb-4">3. International Shipping Process</h2>
      <p className="mb-6">
        <strong>Customs and Import Duties:</strong> International shipments may be subject to import taxes, duties, and customs fees, which are levied once your package reaches your country. These fees are the responsibility of the recipient.
      </p>
      <p className="mb-6">
        <strong>Delivery Time:</strong> International shipping times can vary greatly depending on the destination country and customs clearance. We are not responsible for delays caused by customs or local postal services.
      </p>
      <p className="mb-6">
        <strong>Tracking:</strong> You will receive a tracking number once your order has shipped, allowing you to monitor the status of your shipment. Please note that some international shipments may have limited tracking availability depending on the destination.
      </p>

      <h2 className="text-2xl font-bold mb-4">4. Delivery Issues and Support</h2>
      <p className="mb-6">
        If you encounter any issues with your delivery, such as delays or lost packages, please contact our support team at <a href="mailto:scrimsscrown@gmail.com" className="text-blue-600">scrimsscrown@gmail.com</a>. We will work with you to resolve the issue as quickly as possible.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Contact Information</h2>
      <p className="mb-6">
        For any questions or concerns regarding our shipping and delivery policies, please contact us at:
      </p>
      <ul className="list-none mb-6">
        <li><strong>Email:</strong> <a href="mailto:scrimsscrown@gmail.com" className="text-blue-600">scrimsscrown@gmail.com</a></li>
        <li><strong>Phone:</strong> +916263420394</li>
      </ul>
    </div>
  );
};

export default ShippingAndDelivery;
