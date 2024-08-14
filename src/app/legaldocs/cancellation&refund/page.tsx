import React from 'react';

const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>

      <p className="text-sm text-gray-600 mb-6">Effective Date: 08.14.2024</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Tournament Organizer Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">Prize Pool Contribution:</span> When a tournament organizer (&quot;Organizer&quot;) creates a tournament on Scrims Crown, they must provide the prize pool upfront.</li>
          <li><span className="font-semibold">Distribution:</span> Scrims Crown will distribute the prize pool among the winners at the conclusion of the tournament. The remaining amount collected from users will be returned to the Organizer after deducting a 5% platform fee.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Tournament Cancellation by Organizer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">Cancellation Fee:</span> If the Organizer decides to cancel the tournament, they will lose 1% of the prize pool as a cancellation fee.</li>
          <li><span className="font-semibold">Refunds:</span> The remaining 99% of the prize pool will be refunded to the Organizer. However, the platform fee (5% of the total collection) will not be refunded.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Participation and Cancellation</h2>
        <p className="mb-2"><span className="font-semibold">No Refunds:</span> Users who join a tournament cannot cancel their registration and are not eligible for a refund of their entry fee.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Platform Fees</h2>
        <p className="mb-2"><span className="font-semibold">Service Charge:</span> Scrims Crown charges a 5% fee from the total user collection of each tournament, which is deducted before returning the remainder to the Organizer.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Dispute Resolution</h2>
        <p className="mb-2"><span className="font-semibold">Contact Information:</span> For any disputes or queries regarding cancellations and refunds, please contact us at:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Email: <a href="mailto:scrimsscrown@gmail.com" className="text-blue-600 hover:underline">scrimsscrown@gmail.com</a></li>
          <li>Phone: <a href="tel:+6263420394" className="text-blue-600 hover:underline">+916263420394</a></li>
        </ul>
      </section>
    </div>
  );
};

export default CancellationRefundPolicy;
