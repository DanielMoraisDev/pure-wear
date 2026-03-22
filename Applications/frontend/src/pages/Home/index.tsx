import Banner from "./components/Banner";
import NewArrivals from "./components/NewArrivals";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Banner />
      <NewArrivals />
    </div>
  );
};

export default Home;
