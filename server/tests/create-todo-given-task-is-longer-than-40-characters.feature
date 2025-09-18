Feature: Create Todo

  Scenario: Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.
    Given a client wants to create a new todo
    When the task is longer than 40 characters
    Then the task should not be created.