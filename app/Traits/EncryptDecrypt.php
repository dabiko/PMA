<?php

namespace App\Traits;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Contracts\Encryption\EncryptException;
use Illuminate\Support\Facades\Crypt;

trait EncryptDecrypt
{
   public function encryptId(string $id): string
    {
        try {
            return Crypt::encryptString($id);
        } catch (EncryptException $e) {
            return 'Encryption failed'.$e;
        }
    }

    public function decryptId(string $id): string
    {
        try {
            return Crypt::decryptString($id);
        } catch (DecryptException $e) {
            return 'Decryption failed'.$e;
        }
    }
}
