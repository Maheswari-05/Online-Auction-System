const PostAuctionForm = () => {
    return (
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Product Name" />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Product Description" />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Starting Bid" />
        </div>
        <button type="submit" className="btn btn-success w-100">Post Auction</button>
      </form>
    );
  };
  
  export default PostAuctionForm;