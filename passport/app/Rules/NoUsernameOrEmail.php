<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NoUsernameOremail implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($username, $email)
    {
        $this->username = $username;
        $this->email = $email;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->username != $value && $this->email != $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute cannot be username or email.';
    }
}
