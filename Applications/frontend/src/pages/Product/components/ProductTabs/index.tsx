import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductTabs = ({ product }: { product: any }) => (
  <section className="px-5 md:px-32 mt-16">
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-10">
        <TabsTrigger
          value="description"
          className="text-base font-bold border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none px-0 py-4 transition-all"
        >
          DESCRIPTION
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="text-base font-bold border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none px-0 py-4 transition-all"
        >
          REVIEWS ({product.reviewsCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="description"
        className="py-10 animate-in slide-in-from-bottom-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-black">
              Why choose Pure Wear?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              We focus on delivering high-quality essentials that blend timeless
              design with modern comfort.
            </p>
            <div className="grid grid-cols-1 gap-3 font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-black" size={18} /> 100% Premium
                Cotton Fabric
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-black" size={18} /> Exclusive
                Slim-Fit Tailoring
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-black" size={18} /> Durable &
                Wash-Resistant
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8 border border-dashed border-slate-300">
            <p className="text-slate-500 italic">
              "Our mission is to provide the essential basics with luxury
              quality."
            </p>
            <p className="mt-4 font-bold text-black">— Pure Wear Design Team</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="reviews"
        className="py-10 animate-in slide-in-from-bottom-4"
      >
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 p-8 bg-black rounded-2xl text-center text-white h-fit">
            <span className="text-6xl font-black">{product.rating}.0</span>
            <div className="flex justify-center text-yellow-400 my-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" />
              ))}
            </div>
            <p className="text-slate-400">
              Based on {product.reviewsCount} verified customer ratings.
            </p>
          </div>
          <div className="flex-1 space-y-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border-b pb-6 last:border-0 border-slate-100"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-black">Verified Buyer</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    March 22, 2026
                  </span>
                </div>
                <div className="flex text-yellow-400 mb-3 scale-90 origin-left">
                  {[...Array(5)].map((_, st) => (
                    <Star key={st} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "The product exceeded my expectations in terms of fit and
                  fabric quality..."
                </p>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full h-12 border-slate-300 text-slate-500 font-bold hover:bg-slate-50"
            >
              VIEW ALL REVIEWS
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </section>
);

export default ProductTabs;
