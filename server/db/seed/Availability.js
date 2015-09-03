// day: DataTypes.INTEGER,
// startTime: DataTypes.TIME,
// endTime: DataTypes.TIME

module.exports = function (Availability) {
  var records = [], startTime, endTime;

  for (var j = 1 ; j <= 50; j++) {
    for (var i = 1; i <= 7; i++) {
      if (j % 3 === 0 && i === 4 || j % 3 === 0 && i === 2 || j % 2 === 0 && i === 5 || j % 5 === 0 && i === 6) {
        continue;
      }

      startTime = randomTime(10, 16);
      endTime = randomTime(startTime, 24);

      records.push({
        day: i,
        startTime: startTime + ':00:00',
        endTime: endTime + ':00:00',
        UserId: j
      });
    }
  }

  function randomTime (start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  return Availability.bulkCreate(records);
}
