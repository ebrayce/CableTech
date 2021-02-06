<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Exception;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {

        $mode = $request->mode;
        switch ($mode) {
            case "load-customers":
                return $this->loadAllCustomers($request);
            case "load-customer":
                return $this->loadACustomer($request);
            case 'update-customer':
            case 'create-customer':
                return $this->handleCustomer($request);
            case 'delete-customer':
                return $this->deleteCustomer($request);

            default:
                return [
                    "Lost" => true
                ];
        }
    }

    private function loadAllCustomers(Request $request)
    {
        return Customer::get();
    }

    private function loadACustomer(Request $request)
    {
        return Customer::findOrFail($request->id);
    }

    private function handleCustomer(Request $request)
    {

        if ($request->mode == "update-customer") {
//            Update
            $customer = Customer::findOrFail($request->id);

            $customer = $this->fillForMe($request, $customer);

        } else {
            //  Create
            $customer = new Customer();
            $customer = $this->fillForMe($request, $customer);

        }

        $customer->save();

        return Customer::find($customer->id);
    }

    private function fillForMe(Request $request, Customer $customer)
    {
        $customer->name = $request->name;
        $customer->phone = $request->phone;
        $customer->account_num = $request->account_num;
        $customer->location = $request->location;
        $customer->expired_date = $request->expired_date;
        $customer->amount_paid = $request->amount_paid;

        return $customer;

    }

    private function deleteCustomer(Request $request)
    {
        $customer = Customer::findOrFail($request->id);

        try {
            $customer->delete();
        } catch (Exception $e) {
        }

    }
}
