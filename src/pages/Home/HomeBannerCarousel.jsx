import { useState, useEffect } from "react";
import { getVouchers } from "../../services/HomeService";

const HomeBannerCarousel = () => {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    handleBannerImages();
  }, []);

  const handleBannerImages = async () => {
    const res = await getVouchers();
    if (res && res.result) {
      const data = res.result;
      const reverseData = data.reverse();
      console.log("test" + reverseData);

      const beginDate = reverseData.beginDate;
      const endDate = reverseData.endDate;
      const validData = reverseData.filter(
        (e) =>
          new Date(e.beginDate) < new Date() && new Date(e.endDate) > new Date()
      );
      console.log("test2" + JSON.stringify(validData));
      setBannerImages(validData);
    }
  };

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {bannerImages.length > 0 &&
          bannerImages.map((bannerImage, index) => (
            <div
              key={index}
              className={`carousel-item ${index == 0 ? "active" : ""}`}
              data-bs-interval="5000"
            >
              <img
                src={bannerImage.image}
                className="d-block w-100"
                alt="Home banner"
              />
            </div>
          ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeBannerCarousel;
