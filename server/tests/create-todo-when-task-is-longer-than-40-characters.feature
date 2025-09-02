Feature: Create Todo
  As a client
  I want to create a new todo
  So that I can manage my tasks

  Scenario: Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.
    Given a client wants to create a new todo
    When the task is "This is a very, very long task that exceeds forty characters in length and should be rejected due to length constraints." which is longer than 40 characters
    Then the task should not be created