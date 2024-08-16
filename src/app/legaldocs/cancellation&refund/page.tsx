import React from 'react';

const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>
      <p className="text-sm mb-6">Effective Date: 08.14.2024</p>

      <h2 className="text-2xl font-bold mb-4">1. Tournament Organizer Responsibilities</h2>
      <p className="mb-6">
        <strong>Prize Pool Contribution:</strong> When a tournament organizer ("Organizer") creates a tournament on Scrims Crown, they must provide the prize pool upfront.
      </p>
      <p className="mb-6">
        <strong>Distribution:</strong> Scrims Crown will distribute the prize pool among the winners at the conclusion of the tournament. The remaining amount collected from users will be returned to the Organizer after deducting a 5% platform fee.
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Tournament Cancellation by Organizer</h2>
      <p className="mb-6">
        <strong>Cancellation Fee:</strong> If the Organizer decides to cancel the tournament, they will lose 1% of the prize pool as a cancellation fee.
      </p>
      <p className="mb-6">
        <strong>Refunds:</strong> The remaining 99% of the prize pool will be refunded to the Organizer. However, the platform fee (5% of the total collection) will not be refunded.
      </p>

      <h2 className="text-2xl font-bold mb-4">3. User Participation and Cancellation</h2>
      <p className="mb-6">
        <strong>No Refunds:</strong> Users who join a tournament cannot cancel their registration and are not eligible for a refund of their entry fee.
      </p>

      <h2 className="text-2xl font-bold mb-4">4. Platform Fees</h2>
      <p className="mb-6">
        <strong>Service Charge:</strong> Scrims Crown charges a 5% fee from the total user collection of each tournament, which is deducted before returning the remainder to the Organizer.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Return and Exchange Policy</h2>
      <p className="mb-6">
        <strong>Return/Exchange Window:</strong> Any eligible returns or exchanges must be initiated within 30 days of the purchase date.
      </p>
      <p className="mb-6">
        <strong>How to Initiate a Return or Exchange:</strong> To initiate a return or exchange, please contact us at <a href="mailto:scrimsscrown@gmail.com" className="text-blue-600">scrimsscrown@gmail.com</a>.
      </p>
      <p className="mb-6">
        <strong>Refund Processing Time:</strong> Refunds will be processed within 7 days after the return or exchange request has been approved.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Dispute Resolution</h2>
      <p className="mb-6">
        <strong>Contact Information:</strong> For any disputes or queries regarding cancellations and refunds, please contact us at:
      </p>
      <ul className="list-none mb-6">
        <li><strong>Email:</strong> <a href="mailto:scrimsscrown@gmail.com" className="text-blue-600">scrimsscrown@gmail.com</a></li>
        <li><strong>Phone:</strong> +916263420394</li>
      </ul>
    </div>
  );
};

export default CancellationRefundPolicy;
