# paginator
paginator is a light js pagination tool. It just creates a pagination bar where users can go to other pages. you should yourself handle the page change function. (it is not a datatable)

## Installation
Copy the paginator.js file in your project where browser can see that. for example in assets directyory or a public directory.<br>
Include it in your page with `<script>` tag: ```<script src="/PATH_TO_DOWNLOADED_FOLDER/paginator.js"></script>```

## Dependencies
bootstrap: you need to include bootstrap before calling the library so the pagination bar would be a beautiful thing.

## Usage (Methods)
### Initial:
It is as simple as possible. You should initial paginator and give it some basic config. Also you can pass a `onchange` function, so every time page changes the fuction will call.<br>
It is wise to call `Destory` everytime before calling `init` as the `init` function won't work on elements which are already a paginator. e.g:
```js
paginator.init({
  selector: '.paginatorParent', 
  defaultPage: page || 1, 
  lastPage: lastPage || 50, 
  onChange: function pageChanged(prevPage, newPage) {
    if(prevPage !== newPage) {
      //do more things or call other functions like ajax calls
    }
  }
})
```
|Key          |Mandatory|Default|Type    |Description|
|-------------|:-------:|:-----:|:------:|-----------|
|`selector`   | yes     |-      |string  |must selects a dom element. make sure the element exists (the document is loaded and ready)|
|`defaultPage`| no      |1      |number  |the first page that would be checked by default. (could be a parsable string like "1")     |
|`lastPage`   | no      |1      |number  |the last page that user can chack. (could be a parsable string like "50")                  |
|`onChange`   | no      |null   |function|the function which will call every time a page change accures. it has two inputs "previous page" and "current page"|           

### Destory:
By calling this function all pagination functionality and appearance would be remove from thet dom element.<br>
It is wise to call `Destory` everytime before calling `init` as the `init` function won't work on elements which are already a paginator. 
```
paginator.destroy({
  selector: '.paginatorParent',
})
```
|Key          |Mandatory|Default|Type    |Description|
|-------------|:-------:|:-----:|:------:|-----------|
|`selector`   | yes     |-      |string  |must selects a dom element. make sure the element exists (the document is loaded and ready)|

## output
![Alt text](example2.png?raw=true "preview")

## Contributing
Pull requests are welcome and I would be happy if you try to make this library more usable. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
