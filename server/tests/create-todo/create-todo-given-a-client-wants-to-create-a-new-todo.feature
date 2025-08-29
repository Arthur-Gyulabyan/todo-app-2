Feature: Create Todo

  Scenario: Given a client wants to create a new todo, when they send a 'Create Todo' command with a task, then a 'Todo Created' event occurs and the new todo is saved.
    Given a client wants to create a new todo
    When they send a 'Create Todo' command with a task
    Then a 'Todo Created' event occurs and the new todo is saved