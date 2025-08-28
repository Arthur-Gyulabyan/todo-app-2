Feature: Delete Todo
  As a user
  I want to delete a todo
  So that I can manage my tasks

  Scenario: Successfully delete an existing todo
    Given a todo with ID "123" exists in the system
    When I send a POST request to "/delete-todo" with body { "todoID": "123" }
    Then the response status code should be 200
    And the response body should contain { "message": "Todo with ID 123 deleted successfully." }
    And the todo with ID "123" should no longer exist in the system

  Scenario: Attempt to delete a non-existent todo
    Given no todo with ID "nonExistentID" exists in the system
    When I send a POST request to "/delete-todo" with body { "todoID": "nonExistentID" }
    Then the response status code should be 400
    And the response body should contain { "message": "Todo with ID nonExistentID not found." }

  Scenario: Attempt to delete a todo with missing ID
    When I send a POST request to "/delete-todo" with an empty body
    Then the response status code should be 400
    And the response body should contain { "message": "todoID is required in the request body." }