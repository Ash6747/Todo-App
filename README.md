# Hosted URl [ToDo App](https://ash6747.github.io/Todo-App/).
# Project Details
We import the saveTodos and loadTodos functions from the todoData.js file.
When the component mounts, we use loadTodos to load TODO data from local storage.
Whenever the todos state changes, we use saveTodos to save the updated TODO data to local storage.

We added a timestamp property to each TODO object to keep track of their creation and completion times. This is crucial for sorting.

When a new TODO is added, it is inserted at the beginning of the todos array to ensure that the most recent TODOs appear at the top.

We added sorting functions (sortByCreation and sortByCompletion) to control the order in which TODOs are displayed. sortByCreation sorts TODOs by creation timestamp (most recent on top), and sortByCompletion sorts TODOs by completion status and completion timestamp (most recent completed on top).

In the ul element, we use todos.sort(sortByCompletion) to sort the TODOs before mapping and rendering them. This ensures that active TODOs appear at the top in order of creation, and completed TODOs appear at the bottom in order of completion.

We added an "Edit" button to each TODO card, which allows you to edit the title and description of the TODO item when clicked.

When the "Edit" button is clicked, it sets the editIndex state to the index of the TODO item being edited. This enables the "Update" and "Cancel" buttons to appear and allows you to perform the update or cancel the edit.

The updateTodo function updates the title and description of the TODO item being edited when you click the "Update" button.
