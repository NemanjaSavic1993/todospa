<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(Request $request)
    {

        $tasks = Task::query();
        if($request->searchText != ''){
            $tasks = Task::where('name', 'like', '%'.$request->searchText.'%');
        }

        $tasks = $tasks->where('user_id', '=', Auth::user()->id);

        $tasks = $tasks->orderBy('serial_number', 'asc')->paginate(5);


        return response()->json([
            'tasks' => $tasks
        ], 200);


    }

    public function store(Request $request)
    {

        $request->validate([
            'naziv' => 'required'
        ]);

        $task = new Task();

        $rb = DB::table('tasks')->max('serial_number') + 1;

        $task->serial_number = $rb;
        $task->name = $request->naziv;
        $task->status = 'In proccess';
        $task->user_id = Auth::user()->id;

        $res = $task->save();

        if($res){
            return response()->json(['message' => 'Uspešno ste uneli podatke'], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $task = Task::find($id);

        if($task->status === 'In proccess'){
            $task->status = 'Finished';
        }else{
            $task->status = 'In proccess';
        }

        $task->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->delete();

    }
}
