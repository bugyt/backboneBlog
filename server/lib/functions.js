///////////////////////////////////////////////////////////////////////
// Check if a property is unique, if not the property is incremented //
///////////////////////////////////////////////////////////////////////
exports.uniqueProp = function(collection, prop, value) {
  return new Promise(function(resolve, reject) {
    collection.find({
      [prop]: {
        $regex: value
      }
    }).toArray(function(err, items) {
      if (err) {
        reject({
          'error': 'An error has occurred'
        });
      } else {
        var ii = 1;
        var tmp = value;
        while (findValue(items, tmp, prop)) {
          tmp = value + ii.toString();
          ii++;
        }
        value = tmp;
        resolve(value);
      }
    });
  });
};


function findValue(ObjectsArray, value, property) {
  for (var i = 0; i < ObjectsArray.length; i++) {
    if (ObjectsArray[i][property] === value) {
      return true;
    }
  }
  return false;
}