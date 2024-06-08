<?php

namespace App\Http\Resources;

use App\Traits\EncryptDecrypt;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $email
 */
class UserResource extends JsonResource
{
   // use EncryptDecrypt;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         // return parent::toArray($request);

        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email
        ];

    }
}
