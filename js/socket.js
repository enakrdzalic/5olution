var socket = io.connect('http://206.87.212.9:8081');

// Listen for initial server connection
socket.on('items', function(items) {
  var i = 0;
  if($('#objectTable').length == 1) {
    $('#objectTable').remove();
  }
  $('#objectHead').append($('<tbody id="objectTable"></tbody>'));
  JSON.parse(items).forEach(function(item) {
    i++;
    $('#objectTable').append('<tr id="tr'+i+'"></tr>');
    $('#tr' + i).append($('<td>').text(i));
    $('#tr' + i).append($('<td id="tdname'+i+'"></td>').text(item['name']));
    var $button = $('<button id="unregister'+i+'" class="btn btn-primary">Unregister</button>');
    $button.on('click', function() {
      unregisterItem(item.name);
    });
    $('#tr' + i).append($('<td>').append($button));
    return item;
  });
});

function buildItem(itemName) {
  var item = {};
  item['item_name'] = itemName;
  var stringItem = JSON.stringify(item);
  return stringItem;
}

function unregisterItem(itemName) {
  socket.emit('unregister', buildItem(itemName));
}

$('#addButton').click(function() {
  var item = buildItem($('#objectName').val());
  socket.emit('register', item);
});