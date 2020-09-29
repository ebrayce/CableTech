<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index(Request $request)
    {
        $mode = $request->mode;
        switch ($mode) {
            case 'load-purchases':
                return $this->getAllPurchases($request);

            case 'create-purchase':
                return $this->createPurchase($request);

            case 'update-purchase':
                return $this->updatePurchase($request);
            case 'delete-purchase':
                return $this->deletePurchase($request);
            case 'overview':
                return $this->overview();
        }

    }

    private function getAllPurchases(Request $request)
    {
        return Purchase::all();
    }

    private function createPurchase(Request $request)
    {
        $purchase = new Purchase();
        $purchase = $this->fillPurchase($request, $purchase);
        $purchase->save();

        $product = Product::findOrFail($request->product_id);

        $product->in_stock = $product->in_stock + $request->quantity;
        Product::saveProduct($product);
//        $product->is_out_stock = $product->in_stock <= 0;
//        $product->is_low_stock = $request->in_stock <= $request->min_stock;
//        $product->save();


        return [
            'purchase' => Purchase::findOrFail($purchase->id),
            'product' => Product::findOrFail($product->id)
        ];

    }

    private function deletePurchase(Request $request)
    {
        try {
            $purchase = Purchase::findOrFail($request->id);

            $product = $purchase->product;
            $product->in_stock -= $purchase->quantity;

            $purchase->delete();
            Product::saveProduct($product);

            return [
//                'purchase'=>Purchase::findOrFail($purchase->id),
                'product' => Product::findOrFail($product->id)
            ];
        } catch (\Exception $e) {
            abort(500, $e);
        }
    }

    private function updatePurchase(Request $request)
    {
        $purchase = Purchase::findOrFail($request->id);
        $purchase = $this->fillPurchase($request, $purchase);
        $purchase->save();

        return Purchase::findOrFail($purchase->id);
    }

    private function fillPurchase(Request $request, Purchase $purchase)
    {
        $purchase->price = $request->price;
        $purchase->quantity = $request->quantity;
        $purchase->product_id = $request->product_id;

        return $purchase;
    }

    public function overview()
    {
        $totalPurchases = Purchase::count();
        $totalPurchasesOutOfStock = Purchase::where('is_out_stock', true)->count();
        $totalPurchasesBelowMinStock = Purchase::where('is_low_stock', true)->count();
        return [
            'total' => $totalPurchases,
            'outOfStock' => $totalPurchasesOutOfStock,
            'belowMin' => $totalPurchasesBelowMinStock

        ];
    }
}



