<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'task_title' => $this->task_title,
            'task_description' => $this->task_description,
            'task_due_date' => $this->task_due_date,
            'task_status' => $this->task_status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
