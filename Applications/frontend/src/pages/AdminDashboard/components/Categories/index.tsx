import { useEffect, useState } from "react";
import Category from "./components/Category";
import CategorySkeleton from "./components/CategorySkeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    const timer = setTimeout(() => setIsLoading(false), randomDelay);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 3, title: "Kids", status: "Active" },
    { id: 2, title: "Men", status: "Active" },
    { id: 1, title: "Women", status: "Active" },
  ];

  return (
    <Card className="border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
            : categories.map((cat) => <Category key={cat.id} category={cat} />)}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Categories;
