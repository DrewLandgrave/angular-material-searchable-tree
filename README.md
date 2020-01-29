# angular-material-searchable-tree

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-material-searchable-tree)

## Purpose
This app demonstrates filtering a [Angular Material Tree](https://material.angular.io/components/tree). 

## Components
### TopicTreeComponent
This component ensapsulates the [Angular Material Tree](https://material.angular.io/components/tree) while allowing us to hook the table up to a datasource.

Documentation at the link above explaines the `treeControl` `treeFlattener` and `dataSource` 

In this component we are adding the some functions:

`hExpandClick` will prevent the expand buttons from submitting the form. 

`filter` acts as a passthrough to the `TopicApiService` to call it's filter function

`clearFilter` acts as a passthrough to the `TopicApiService` to call it's filter function with no term to reset the filter

`hSelection` listens for the click on the tree items to set the value on the component and emit the `valueChange` event.

Lastly there are 3 helper functions `getNodeLevel`, `isExpandable`, and `getChildren` to facilitate the tree nesting.

### TopicControlDropdown
This component contains 2 fields. An [Angular Material Input](https://material.angular.io/components/input/overview) and our `TopicTreeComponent`. It also facilitates showing and hiding the `TopicTreeComponent` on focus and blur of the input element.

In the `ngOnInit` function we listen for the changes on the `searchFilter` [Subject](https://rxjs-dev.firebaseapp.com/guide/subject). The [debounceTime](https://rxjs-dev.firebaseapp.com/api/operators/debounceTime) rxjs operator will wait for 5 milliseconds after the last keystroke to filter the table. The [distinctUntilChanged](https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilChanged) operator only emits when the current value is different than the last. This is to prevent race conditions with our filtering.

The `filterChanged` function is called on input change and will call `next` on the `searchFilter` Subject. Triggering our component to call `filter` or `clearFilter` on the `TopicTreeComponent`

## TopicApiService
This service will call the topic and return fallback data if it can't be reached.