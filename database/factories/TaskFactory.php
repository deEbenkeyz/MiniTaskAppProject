<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'task_title' => $this->faker->words(4, true),
            'task_description' => $this->faker->sentences(3, true),
            'task_due_date' => $this->faker->date(),
            'task_status' => $this->faker->randomElement(['Pending', 'Completed', 'Cancelled', 'To do']),
            'authorId' => $this->faker->randomElement([1, 2]),
        ];
    }
}
