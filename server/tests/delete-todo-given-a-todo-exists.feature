Feature: Deleting a Todo

  Scenario: Given a todo exists, when a client sends a 'Delete Todo' command with the todo ID, then a 'Todo Deleted' event occurs and the todo is removed from the system.
    Given a todo exists
    When a client sends a 'Delete Todo' command with the todo ID
    Then a 'Todo Deleted' event occurs and the todo is removed from the system.