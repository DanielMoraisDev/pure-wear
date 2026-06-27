<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // show all productss
    public function getProducts(Request $request) {
        $products = Product::orderBy('created_at', 'DESC')->where('status', 1)->limit(8);

        // filter by id category
        if(!empty($request->category)){
            $catArray = explode(',', $request->category);
            $products = $products->WhereIn('category_id', $catArray);
        }

        // filter by id brand
        if(!empty($request->brand)){
            $brandArray = explode(',', $request->brand);
            $products = $products->WhereIn('brand_id', $brandArray);
        }

        $products = $products->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    // show featured products
    public function featuredProducts() {
        $products = Product::orderBy('created_at', 'DESC')->where('status', 1)->where('is_featured', 'yes')->limit(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    // show latest products
    public function latestProducts() {
        $products = Product::orderBy('created_at', 'DESC')->where('status', 1)->limit(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    // show all categories
    public function getCategories() {
        $categories = Category::orderBy('name', 'ASC')->where('status', 1)->get();

        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    // show all brands
    public function getBrands() {
        $brands = Brand::orderBy('name', 'ASC')->where('status', 1)->get();

        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }
}
