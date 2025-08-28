Feature: Update Todo

  Scenario: Given a todo exists, when a client sends an 'Update Todo' command with a new task and the todo ID, then a 'Todo Updated' event occurs and the todo's task is modified.
    Given a todo exists
    When a client sends an 'Update Todo' command with a new task "Buy groceries" and the todo ID
    Then a 'Todo Updated' event occurs and the todo's task is modified to "Buy groceries"