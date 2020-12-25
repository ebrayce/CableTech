<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $mode = $request->mode;
        switch ($mode) {
            case 'load-sales':
                return $this->getAllSales($request);

            case 'create-sale':
                return $this->createSale($request);

            case 'update-sale':
                return $this->updateSale($request);
            case 'delete-sale':
                return $this->deleteSale($request);
            case 'overview':
                return $this->overview();
        }

    }

    private function getAllSales(Request $request)
    {
        return Sale::all();
    }

    private function createSale(Request $request)
    {

        $product = Product::findOrFail($request->product_id);
        $sale = new Sale();
        $sale = $this->fillSale($request, $sale);
        $sale->save();

        $product->in_stock = $product->in_stock - $request->quantity;

        Product::saveProduct($product);




        return [
            'sale'=>Sale::findOrFail($sale->id),
            'product'=>Product::findOrFail($product->id)
        ];

    }

    private function deleteSale(Request $request)
    {
        try {
            $sale = Sale::findOrFail($request->id);

            $product = $sale->product;
            $product->in_stock += $sale->quantity;

            $sale->delete();
            Product::saveProduct($product);

            return [
//                'sale'=>Sale::findOrFail($sale->id),
                'product'=>Product::findOrFail($product->id)
            ];
        } catch (\Exception $e) {
            abort(500,$e);
        }
    }

    private function updateSale(Request $request)
    {
        $sale = Sale::findOrFail($request->id);
        $sale = $this->fillSale($request, $sale);
        $sale->save();

        return Sale::findOrFail($sale->id);
    }

    private function fillSale(Request $request, Sale $sale)
    {
        $sale->price = $request->price;
        $sale->sold_at = $request->sold_at;
        $sale->quantity = $request->quantity;
        $sale->product_id = $request->product_id;

        return $sale;
    }

    public function overview()
    {
        $totalSales = Sale::count();
        $totalSalesOutOfStock = Sale::where('is_out_stock', true)->count();
        $totalSalesBelowMinStock = Sale::where('is_low_stock', true)->count();
        return [
            'total' => $totalSales,
            'outOfStock' => $totalSalesOutOfStock,
            'belowMin' => $totalSalesBelowMinStock

        ];
    }

}
