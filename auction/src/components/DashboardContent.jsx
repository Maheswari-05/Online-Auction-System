import React from 'react';
import { Link } from 'react-router-dom';
import AuctionCard from './AuctionCard'; // Assuming you have an AuctionCard component

const DashboardContent = () => {
  // Sample auction data
  const auctions = [
    { id: 1, title: 'Vintage Watch', currentBid: 150, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Antique Vase', currentBid: 300, image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Rare Painting', currentBid: 500, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>

      {/* Quick Actions */}
      <div className="text-center mb-5">
        <Link to="/post-auction" className="btn btn-primary me-3">
          Post New Auction
        </Link>
        <Link to="/auctions" className="btn btn-success">
          View All Auctions
        </Link>
      </div>

      {/* Ongoing Auctions Section */}
      <h3 className="mb-4">Ongoing Auctions</h3>
      <div className="row">
        {auctions.map((auction) => (
          <div key={auction.id} className="col-md-4 mb-4">
            <AuctionCard auction={auction} />
          </div>
        ))}
      </div>

      {/* No Auctions Message */}
      {auctions.length === 0 && (
        <div className="alert alert-info text-center">
          No ongoing auctions. Start by posting a new auction!
        </div>
      )}
    </div>
  );
};

export default DashboardContent;