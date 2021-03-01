<?php

namespace App\Console\Commands;

use App\Models\Gender;
use App\Models\User;
use Artisan;
use Hash;
use Illuminate\Console\Command;

class StartUp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if (config('app.env') === "local"){
            Artisan::call('migrate:fresh');
        }



        $this->comment("Creating Super Admin");
        $admin = new User();

        $admin->name = "Super Admin";
        $admin->email = "admin@gmail.com";
        $admin->password = Hash::make("password1");
//        $admin->is_admin = true;
        $admin->save();
        $this->comment("Super Admin created.");



//        $bar = $this->output->createProgressBar(200);
//        Artisan::call('db:seed');
//        $bar->finish();
        return 0;
    }
}
