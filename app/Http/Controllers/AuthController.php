<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;

class AuthController extends Controller
{
  public function login(Request $request)
  {
          $request->request->add([
              'username' => $request->username,
              'password' => $request->password,
              'grant_type' => 'password',
              'client_id' => env('PASSPORT_CLIENT_ID'),
              'client_secret' => env('PASSPORT_CLIENT_SECRET'),
              'scope' => '*'
          ]);

          $tokenRequest = Request::create(
              env('APP_URL').'/oauth/token',
              'post'
          );

          $response = Route::dispatch($tokenRequest);


          if($response->getStatusCode() == 200){
              return $response->getContent();
          } else if($response->getStatusCode() === 400){
              return response()->json('Solicitud no válida. Introduzca un nombre de usuario o una contraseña.', 400);
          } else if ($response->getStatusCode() === 401) {
              return response()->json('Tus credenciales son incorrectas. Inténtalo de nuevo', 401);
          }


          return response()->json('Algo salió mal en el servidor.', $response->getStatusCode());

  }

  public function register(Request $request)
  {
      $request->validate([
        'nombre' => 'required',
        'username' => 'required',
        'password' => 'required',
      ]);

      $user = new User;

      $user->name = $request->nombre;
      $user->email = $request->username;
      $user->password = bcrypt($request->password);

      $user->save();

      return response()->json('Registrado correctamente.', 200);

  }

  public function logout()
  {
      auth()->user()->tokens->each(function ($token, $key) {
          $token->delete();
      });

      return response()->json('Cerró sesión correctamente', 200);
  }
}
