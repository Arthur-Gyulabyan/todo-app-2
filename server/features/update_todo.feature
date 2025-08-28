Feature: Update Todo
  As a client
  I want to update an existing todo's task
  So that I can correct or change todo details

  Scenario: Successfully update an existing todo's task
    Given a todo with ID "todo-123" and task "Buy groceries" exists
    When a client sends an "Update Todo" command for todo ID "todo-123" with new task "Buy organic groceries"
    Then the todo with ID "todo-123" should have task "Buy organic groceries"
    And a "Todo Updated" event should occur

  Scenario: Attempt to update a non-existent todo
    Given no todo with ID "non-existent-todo" exists
    When a client sends an "Update Todo" command for todo ID "non-existent-todo" with new task "New task"
    Then the system should respond with a "400 Bad Request" status
    And the response message should indicate "Todo with ID non-existent-todo not found."

  Scenario: Attempt to update a todo with missing todo ID
    When a client sends an "Update Todo" command with missing todo ID and task "Some task"
    Then the system should respond with a "400 Bad Request" status
    And the response message should indicate "Both todoID and task are required."

  Scenario: Attempt to update a todo with missing task
    Given a todo with ID "todo-456" and task "Existing task" exists
    When a client sends an "Update Todo" command for todo ID "todo-456" with missing task
    Then the system should respond with a "400 Bad Request" status
    And the response message should indicate "Both todoID and task are required."