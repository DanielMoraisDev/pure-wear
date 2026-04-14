<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
     // This method will return all products
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')->with('product_images')->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
        ]);

    }

    // This method will create a product in db
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $product = new Product;
        $product->title = $request->title;
        $product->compare_price = $request->compare_price;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->barcode = $request->barcode;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        // Save the product images
        if(!empty($request->gallery)) {
            foreach($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $imageName = $product->id.'-'.time().'-'.$key.'.'.$ext;

                $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                // Large Thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($sourcePath);
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/'.$imageName));

                // Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($sourcePath);
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/'.$imageName));

                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product added successfully.',
            'data' => $product,
        ], 200);
    }

    // This method will return a single product
    public function show($id)
    {

        $product = Product::with('product_images')->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
                'data' => [],
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product,
        ], 200);

    }

    // This method will update a single product
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
                'data' => [],
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku,'.$id.',id',
            'is_featured' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $product->title = $request->title;
        $product->compare_price = $request->compare_price;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->barcode = $request->barcode;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully.',
            'data' => $product,
        ], 200);
    }

    // This method will destroy a single product
    public function destroy($id)
    {

        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
                'data' => [],
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully.',
        ], 200);

    }

    public function saveProductImage(Request $request) {
         $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        // Store the image
        $image = $request->file('image');
        $imageName = $request->product_id.'-'.time().'.'.$image->extension();

        $sourcePath = $image->getPathName();

        // Large Thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($sourcePath);
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/'.$imageName));

        // Small Thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($sourcePath);
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/'.$imageName));

        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully.',
            'data' => $productImage
        ]);
    }
}
