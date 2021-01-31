<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Image;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $mode = $request->mode;
        switch ($mode) {
            case 'load-products':
                return $this->getAllProducts($request);

            case 'delete-image':
                return $this->deleteImage($request);

            case 'create-product':
                return $this->createProduct($request);

            case 'upload-image':
                return $this->uploadProductImage($request);

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
//        return
        $product = new Product();
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

    private function uploadProductImage(Request $request)
    {
        $fileNames = [];

        $product = Product::findOrFail($request->product_id);

        if ($request->hasFile('files')) {

            $files = $request->file('files');

            foreach ($files as $file) {
                $imageName = $this->generateImageName() . '.jpg';


                if ($this->saveImage($file, $imageName)) {
                    $image = new ProductImage();
                    $image->name = $imageName;
                    $product->images()->save($image);
                }

            }
        }

        return Product::findOrFail($product->id);
    }

    private function generateImageName()
    {
        return uniqid() . date('mdYHisu');
    }

    /**
     * @param UploadedFile $file
     * @param string $imageName
     * @return bool
     */
    private function saveImage(UploadedFile $file, string $imageName): bool
    {
//        Web
        $web = ProductImage::getPath('web') . $imageName;
        Image::make($file)->fit(1080, 720, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->save($web);

//        Square
        $square = ProductImage::getPath('square') . $imageName;
        Image::make($file)->fit(400, 400, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->save($square);


//        thumb
        $thumb = ProductImage::getPath('thumb') . $imageName;
        Image::make($file)->fit(360, 240, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->save($thumb);

//        original
        $original = ProductImage::getPath('original') . $imageName;
        Image::make($file)->save($original);
        return true;
    }

    private function updateProduct(Request $request)
    {
        $product = Product::findOrFail($request->id);
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
        } catch (Exception $e) {
            abort(500);
        }
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

    private function deleteImage(Request $request)
    {
        $product = Product::findOrFail($request->product_id);
        $product->images()->findOrFail($request->image_id)->delete();
        return $product->images;
    }

}
