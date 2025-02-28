import AuctionCard from './AuctionCard';

const AuctionList = () => {
  const auctions = [
    { id: 1, title: 'Product 1', currentBid: 100 },
    { id: 2, title: 'Product 2', currentBid: 200 },
  ];

  return (
    <div>
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AuctionList;