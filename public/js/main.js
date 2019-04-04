$(document).ready(function () {
  $('.delete-note').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/notes/' + id,
      success: function (response) {
        window.location.href = '/';
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

//delete todo

  $('.delete-todo').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/todos/' + id,
      success: function (response) {
        window.location.href = '/';
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

  //add todo new version

  $('#addNewTodo').on('click', async function (e) {
    e.preventDefault();
    const todoList = [];
    const elems = document.getElementsByClassName('listItem');
    await [].forEach.call(elems, element => {
      let listItem = {};
      if (element.style[0] !== "display") {
        listItem.text = element.innerText;
        if (element.className == "checked listItem" || element.className == "listItem checked") {
          listItem.checked = true;
        } else {
          listItem.checked = false;
        }
        todoList.push(listItem);
      }
    });
    let body = {
      title: $('#todoTitle').val(),
      body: todoList
    };
    if (body.title == "" || body.body.length == 0) {
      alert('title and list are required')
    } else {
      fetch('/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(function (response) {
        if (response.ok) {
          console.log('todo added');
          alert('todo added');
          window.location.href = '/';
        }
      }).catch(function (error) {
        console.log('There has been some problem: ' + error.message);
      });
    }
  });

  // edit todo title

  $('.todo-title').on('click',  function () {
    $(this).removeAttr( "readonly")
  });

  //update todolist 

  $('#exitAndUpdateTodo').on('click', async function (e) {
    e.preventDefault();
    const todoList = [];
    const elems = document.getElementsByClassName('listItem');
    await [].forEach.call(elems, element => {
      let listItem = {};
      if (element.style[0] !== "display") {
        listItem.text = element.innerText;
        if (element.className == "checked listItem" || element.className == "listItem checked") {
          listItem.checked = true;
        } else {
          listItem.checked = false;
        }
        todoList.push(listItem);
      }
    });
  
    let body = {
      id: $('#inputId').val(),
      title: $('.todo-title').val(),
      body: todoList
    };

    if (body.body.length == 0) {
      alert('at least one item in list is required')
    } else {
      fetch('/todos/edit/' + body.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(function (response) {
        if (response.ok) {
          alert('todo updated');
          window.location.href = '/';
        }
      }).catch(function (error) {
        console.log('There has been some problem: ' + error.message);
      });
    }
  });
  //js for todoList 

  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByClassName("listItem");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("I");
    span.className = "close fas fa-skull-crossbones";
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  // Add a "checked" symbol when clicking on a list item

  var list = document.getElementById('myUL');
  list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
});

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.className = 'listItem';
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("I");
  span.className = "close fas fa-skull-crossbones";
  li.appendChild(span);
  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
var addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', newElement);

