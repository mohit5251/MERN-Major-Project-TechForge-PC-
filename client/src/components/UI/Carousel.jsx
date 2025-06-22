export const Carousel = () => {
  return (
    <div className="carousel-wrapper container mt-4 px-3 px-md-0">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner ratio ratio-16x9">
          <div className="carousel-item active">
            <img
              src="https://res.cloudinary.com/dokpeunu6/image/upload/v1750606247/cover1_bt4tvt.webp"
              className="d-block w-100 h-100"
              alt="cover1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dokpeunu6/image/upload/v1750606247/cover2_ldovd4.webp"
              className="d-block w-100 h-100"
              alt="cover2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dokpeunu6/image/upload/v1750606331/cover3_hfatwp.webp"
              className="d-block w-100 h-100"
              alt="cover3"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="side-image">
        <img src="https://res.cloudinary.com/dokpeunu6/image/upload/v1750606902/sideCover_dx9abx.webp" alt="sideCover" className="w-100 h-100" />
        <div className="text-overlay" style={{backgroundColor: "transparent"}}>
          <h5>CORSAIR</h5>
          <h4 className="mt-2">BOLD STYLE.</h4>
          <h4>BRILLIANT</h4>
          <h4>LIGHTING.</h4>
          <h6 className="mt-2">CORSAIR Cabinets</h6>
          <button className="btn btn-warning mt-1">SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};