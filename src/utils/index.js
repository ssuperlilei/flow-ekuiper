
export function arrToTree(arr, id, pid) {
  var result = [];
  var hash = {};
  var id = id || 'id';
  var pid = pid || 'parent';
  var arr = arr;

  arr.forEach(function (item, index) {
    hash[item[id]] = item;
  });

  arr.forEach(function (item) {
    var hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP.children && (hashVP.children = []);
      hashVP.children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}