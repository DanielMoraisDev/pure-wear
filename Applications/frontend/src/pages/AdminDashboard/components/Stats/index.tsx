import { useEffect, useState } from "react";
import Stat from "./components/Stat";
import StatSkeleton from "./components/StatSkeleton";

const Stats = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    const timer = setTimeout(() => setIsLoading(false), randomDelay);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { title: "Users", value: "1", linkText: "View Users" },
    { title: "Orders", value: "1", linkText: "View Orders" },
    { title: "Products", value: "1", linkText: "View Products" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)
        : data.map((item, i) => <Stat key={i} {...item} />)}
    </div>
  );
};

export default Stats;
