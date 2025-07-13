<?php

namespace App\Http\Requests\Level;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'data' => 'required|array',
            'data.*' => 'required|array',
//            'data.*.*' =>  ['sometimes', 'regex:/^(@|P1|P2|E|S)$/'],
            'data.*.*' => 'required|in:#,P1,@,P2,P3,E',

        ];
    }
}
