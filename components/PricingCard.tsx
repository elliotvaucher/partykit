// PricingCard.tsx

import React from 'react';

const PricingCard: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {/* Pricing Card 1 - Free Plan */}
      <div className="w-full sm:w-64">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
          <p className="mb-4">On email subscription, you will get the full party description.</p>
          <button className="bg-black text-white rounded-lg p-2 w-full">Subscribe</button>
        </div>
      </div>

      {/* Pricing Card 2 - Premium Plan */}
      <div className="w-full sm:w-64">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Premium Plan</h3>
          <p className="mb-4">You get images, full recipes, and many other surprises.</p>
          {/* Image Placeholders */}
          <div className="mb-4">
            <img
              src="/placeholder-image1.png" // Replace with your actual placeholder image URL
              alt="Image Placeholder 1"
              className="w-32 h-32 mx-auto mb-2"
            />
            <img
              src="/placeholder-image2.png" // Replace with your actual placeholder image URL
              alt="Image Placeholder 2"
              className="w-32 h-32 mx-auto mb-2"
            />
            <img
              src="/placeholder-image3.png" // Replace with your actual placeholder image URL
              alt="Image Placeholder 3"
              className="w-32 h-32 mx-auto mb-2"
            />
          </div>
          <button className="bg-black text-white rounded-lg p-2 w-full">$5 / month</button>
        </div>
      </div>

      {/* Pricing Card 3 - Platinum Plan */}
      <div className="w-full sm:w-64">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Platinum Plan</h3>
          <p className="mb-4">
            We organize everything for you, from the order & delivery of groceries to cleaning services
            after the party, including the Spotify playlist.
          </p>
          <button className="bg-black text-white rounded-lg p-2 w-full">Price on Demand</button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
