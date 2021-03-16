<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contacto;

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contactos = Contacto::all();
        return $contactos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
          'nombre' => 'required',
          'apellido' => 'required',
          'telefono' => 'required',
          'correo' => 'required',
        ]);

        $contacto = new Contacto;
        $contacto->create($request->all());

        return response()->json('Creado correctamente', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $contacto = Contacto::find($id);
      return $contacto;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
          'nombre' => 'required',
          'apellido' => 'required',
          'telefono' => 'required',
          'correo' => 'required',
        ]);

        $contacto = Contacto::find($id);
        $contacto->nombre = $request->input('nombre');
        $contacto->apellido = $request->input('apellido');
        $contacto->telefono = $request->input('telefono');
        $contacto->correo = $request->input('correo');
        $contacto->observacion = $request->input('observacion');
        $contacto->save();

        return response()->json('Actualizado correctamente', 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $contacto = Contacto::find($id);
      $contacto->delete();

      return response()->json('Eliminado correctamente', 200);

    }
}
