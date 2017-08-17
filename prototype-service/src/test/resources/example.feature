@txn
Feature: An Example feature

  Scenario Outline: client makes call to post example with a id
    Given An example object exist in the database with example value "<exampleRequestResponse>"
    When the client makes a GET request with the example objects ID
    Then the client receives status code of <status>
    And the response has a example field matching: "<exampleRequestResponse>"

    Examples:
      | exampleRequestResponse | status |
      | one                    | 200    |
      | two                    | 200    |
    