import Banner from "./components/Banner";
import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Banner />
      <NewArrivals />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
