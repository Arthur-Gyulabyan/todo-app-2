Feature: Update Todo

  Scenario: Given a todo exists, when a client sends an 'Update Todo' command with a new task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.
    Given a todo exists
    When a client sends an 'Update Todo' command with a new task that is longer than 40 characters
    Then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.