<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $mode = $request->mode;
        switch ($mode) {
            case 'load-products':
                return $this->getAllProducts($request);

            case 'create-product':
                return $this->createProduct($request);

            case 'update-product':
                return $this->updateProduct($request);
            case 'delete-product':
                return $this->deleteProduct($request);
            case 'overview':
                return $this->overview();
        }

    }

    private function getAllProducts(Request $request)
    {
        return Product::all();
    }

    private function createProduct(Request $request)
    {
        $product = new Product();
        $product = $this->fillProduct($request, $product);
        $product->save();

        return Product::findOrFail($product->id);

    }

    private function deleteProduct(Request $request)
    {
        try {
           $product = Product::findOrFail($request->id);
           $product->purchases()->delete();
           $product->sales()->delete();
           $product->delete();
            return true;
        } catch (\Exception $e) {
            abort(500);
        }
    }

    private function updateProduct(Request $request)
    {
        $product = Product::findOrFail($request->id);
        $product = $this->fillProduct($request, $product);
        $product->save();

        return Product::findOrFail($product->id);
    }

    private function fillProduct(Request $request, Product $product)
    {
        $product->name = $request->name;
        $product->in_stock = $request->in_stock;
        $product->price = $request->price;
        $product->min_stock = $request->min_stock;
        $product->description = $request->description;
        $product->is_out_stock = $request->in_stock == 0;
        $product->is_low_stock = $request->in_stock <= $request->min_stock;
        $product->img_name = "";
        return $product;
    }

    public function overview()
    {
        $totalProducts = Product::count();
        $totalProductsOutOfStock = Product::where('is_out_stock', true)->count();
        $totalProductsBelowMinStock = Product::where('is_low_stock', true)->count();
        return [
            'total' => $totalProducts,
            'outOfStock' => $totalProductsOutOfStock,
            'belowMin' => $totalProductsBelowMinStock

        ];
    }

}
