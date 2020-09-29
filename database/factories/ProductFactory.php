<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $inStock = $this->faker->numberBetween(0,50);
        $minStock = $this->faker->numberBetween(4,50);
        return [
            'name' => $this->faker->name,
            'in_stock' => $this->faker->numberBetween(14,50),
            'price' => $this->faker->randomDigit,
            'min_stock' => $minStock,
            'description' => $this->faker->text,
            'is_out_stock' => $inStock == 0,
            'is_low_stock' => $inStock <= $minStock,
            'img_name' => Str::random(10),

        ];
    }
}
