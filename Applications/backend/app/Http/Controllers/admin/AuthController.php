<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // This method will authenticate user with password and email
    public function authenticate(Request $request)
    {
        // Validation for email and password
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // If failure returns NOT_FOUND with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);

            // Condition to admin role
            if ($user->role == 'admin') {
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name,
                ], 200);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorized to access admin panel.',
                ], 401);
            }

        } else {
            // Return UNAUTHORIZED
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is incorrect.',
            ], 401);
        }

    }
}
