$(document).ready(function () {
  list.init();

});


var list = {

  init: function () {
    list.initStyling();
    list.initEvents();

  },
  initStyling: function () {
    list.renderLists();
  },
  initEvents: function () {

    $('section').on('click', '.showEditList', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editList').toggleClass('show');
    });

    $('section').on('submit', '.editList', function (event) {
      event.preventDefault();
      var listId = $(this).closest('article').data('listid');
      var editedList = {
        title: $(this).find('input[name="editTitle"]').val(),
      };

      lists.updateList(listId, editedList);


    });

    $('#createList').on('submit', function (event) {
      event.preventDefault();
      var newList = {
        title: $(this).find('input[name="newTitle"]').val(),
      };

      lists.createList(newList);
    });

    $('section').on('click', '.deleteList', function (event) {
      event.preventDefault();
      var listId = $(this).closest('article').data('listid');
      console.log(listId);
      books.deleteItem(listId);
    });

  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/allstar',

  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.append(template);
  },
  renderLists: function () {
    $.ajax({
      url: lists.config.url,
      type: 'GET',
      success: function (lists) {
        console.log(lists);
        var template = _.template($('#listTmpl').html());
        var markup = "";
        items.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is.....', markup);
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  createList: function (list) {

    $.ajax({
      url: lists.config.url,
      data: list,
      type: 'POST',
      success: function (data) {
        console.log(data);
        lists.renderLists();
      },
      error: function (err) {
        console.log(err);
      }
    });

  },
  deleteList: function (id) {

    $.ajax({
      url: lists.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        listss.renderLists();
      },
      error: function (err) {
        console.log(err);
      }
    });



  },
  updateList: function (id, list) {

    $.ajax({
      url: items.config.url + '/' + id,
      data: list,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        books.renderLists();
      },
      error: function (err) {
        console.log(err);
      }
    });


  },

};
