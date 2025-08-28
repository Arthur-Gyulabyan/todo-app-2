Feature: Create Todo
  As a client
  I want to create a new todo item
  So that I can keep track of my tasks

  Scenario: Successfully creating a new todo item
    Given a client wants to create a new todo
    When they send a 'Create Todo' command with a task "Buy groceries"
    Then a 'Todo Created' event occurs
    And the new todo "Buy groceries" is saved
    And the response should contain the created todo with status 200

  Scenario: Creating a todo item without a task
    Given a client wants to create a new todo
    When they send a 'Create Todo' command without a task
    Then the system should respond with a 400 status code
    And an error message "Task is required."