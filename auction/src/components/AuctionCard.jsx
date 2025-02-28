import React from 'react';

const AuctionCard = ({ auction }) => {
  return (
    <div className="card h-100">
      <img src={auction.image} className="card-img-top" alt={auction.title} />
      <div className="card-body">
        <h5 className="card-title">{auction.title}</h5>
        <p className="card-text">Current Bid: ${auction.currentBid}</p>
        <button className="btn btn-primary w-100">Place Bid</button>
      </div>
    </div>
  );
};

export default AuctionCard;