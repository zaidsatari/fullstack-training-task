## JavaScript Training - Fetch & Display Data in a Grid with Interactive Selection

### Summary

The Task is to create a web page that fetches an array of objects from an API and displays them as a grid of cards.
 Each card will have a button to toggle selection, changing the background color and updating a counter at the top. Additional buttons will allow selecting all and deselecting all items. The entire implementation must be done using JavaScript only (no CSS files, styling through JS).
Follow the best practices code

## Task Details

1️⃣ Fetch Data from API
Use fetch() to call a mock API endpoint that returns an array of objects.
API-GET: <https://api.magicthegathering.io/v1/cards>
Example API response:
json

[
  { "id": 1, "title": "Item 1", "description": "This is item 1" },
  { "id": 2, "title": "Item 2", "description": "This is item 2" },
  { "id": 3, "title": "Item 3", "description": "This is item 3" }
]

Parse the response and store it in an array.
Display the data dynamically in the UI.
2️⃣ Create the Grid Layout
Use CSS Grid (through JavaScript) to display items in a responsive grid format.
Each item should be displayed inside a card containing:
A title
A description
Other fields based on the api response.
A "Select" button
The card should have a default styling set through JavaScript.

3️⃣ Implement Card Selection
When a user clicks the "Select" button, the card’s background color changes.
A counter at the top updates dynamically to show how many items are selected.
Clicking the button again deselects the item (removes background color).
Example UI behavior:
Before clicking:

Selected: 0
[Item 1] (Select)
[Item 2] (Select)
[Item 3] (Select)

After selecting Item 1 & 3:

Selected: 2
[Item 1] (Deselect) [BG Changed]
[Item 2] (Select)
[Item 3] (Deselect) [BG Changed]
4️⃣ Add "Select All" and "Deselect All" Buttons
A button "Select All" should mark all items as selected.
A button "Deselect All" should reset all selections.
Both should update the counter accordingly.
5️⃣ JavaScript Requirements
DOM Manipulation: Use JavaScript to dynamically create elements (document.createElement).
Event Listeners: Handle button clicks using .addEventListener().
Style Manipulation: Change styles dynamically using element.style.
Loops & Conditionals: Iterate through objects and update selections.

Acceptance Criteria
✅ The grid layout is created dynamically using JS only (no CSS files).
✅ API call fetches and displays items in cards.
✅ Clicking on a card button toggles selection (changes background & updates counter).
✅ Select All / Deselect All buttons work as expected.
✅ The entire logic follows JS Fundamentals (loops, functions, event handling, DOM manipulation, API fetching, etc.).
