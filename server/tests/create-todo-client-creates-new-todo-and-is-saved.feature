Feature: Create Todo
  As a client
  I want to create a new todo
  So that I can manage my tasks

  Scenario: Given a client wants to create a new todo, when they send a 'Create Todo' command with a task, then a 'Todo Created' event occurs and the new todo is saved.
    Given a client wants to create a new todo
    When they send a 'Create Todo' command with a task "Prepare Q4 budget report"
    Then a 'Todo Created' event occurs and the new todo is saved