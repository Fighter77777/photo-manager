Feature: Welcome page
    In order to run the demo
    As a visitor
    I need to be able to get a link to the demo from the welcome page

    @javascript
    Scenario: Successfully get to the demo page
        Given I am on "/"
        When I follow "Run The Demo"
        Then I am on "/demo/"
        Then I should see "Available demos"
