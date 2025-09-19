Feature: Delete Todo

  Scenario: Given no todo exists with a specific ID, when a client sends a 'Delete Todo' command with that ID, then an error indicating 'Todo Not Found' should be returned.
    Given no todo exists with a specific ID
    When a client sends a 'Delete Todo' command with that ID
    Then an error indicating 'Todo Not Found' should be returned