$(document).ready(function(){
  $('.delete-note').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/notes/'+id,
      success: function (response){
        alert('Deleting note');
        window.location.href='/';
      },
      error: function(err){
        console.error(err);
      }
    });
  });

  $('.delete-todo').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/todos/'+id,
      success: function (response){
        alert('Deleting todo list');
        window.location.href='/';
      },
      error: function(err){
        console.error(err);
      }
    });
  });
  // $('.add-todo-item-btn ').on('click', function(e){
  //    e.preventDefault();
  //    const listItemText = document.querySelector(".listText");
  //    const frag = document.createDocumentFragment();
  //    const listItem = document.createElement('p');
  //   //  const listItemCheck = document.createElement('input');
  //    const todoList =  document.querySelector(".todo-list");
  //   //  listItemCheck.type = "checkbox";
  //   //  listItemCheck.value = listItemText.value;
     
  //    listItem.innerHTML = `<input type="checkbox"> ${listItemText.value}`;
  //   //  listItem.prepend(listItemCheck);
  //   //  listItem.name = "1";
  //   //  console.log($('.listText').val()); 
  //    todoList.appendChild(listItem);
  //    listItemText.value = "";

  // });

  $('input[type="submit"]').on('click', async function(e){
     e.preventDefault();
     const elems = document.getElementsByClassName('list-group-item');
    const todoList = [];
    await [].forEach.call(elems, element => {
       let listItem = {};
       if (element.innerText =="\n" || element.innerText ==" " || element.innerText =="  ")
       { console.log('try to add emty list')} else{
        listItem.text = element.innerText;
        listItem.checked = false;
        todoList.push(listItem);
       }
     });
   
     let body = {
       title: $('#title').val(),
       body: todoList
     } ;

     console.log(body);
if (body.title == "" || body.body.length == 0) 
{alert('title and list are required')} else {
     fetch('/todos/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(body)
  }).then(function(response) {
    if(response.ok) {
      console.log('todo added');
      alert('todo added');
      window.location.href='/';
    }
  }).catch(function(error) {
    console.log('There has been some problem: ' + error.message);
  });
}
    // $.ajax({
    //   type: 'POST',
    //   url: '/add',

    //   data: JSON.stringify(todoList),
    //   success: function (response){
    //     console.log("add todo");
        
    //     // alert('Deleting todo list');
    //     // window.location.href='/';
    //   },
    //   error: function(err){
    //     console.error(err);
    //   }
    // });
  });
});