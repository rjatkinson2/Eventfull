module.exports = function (sequelize, DataTypes) {
  var UserPositions = sequelize.define('UserPositions', {
    score: DataTypes.INTEGER,
    salary: DataTypes.INTEGER
  }, {
    classMethods: {
      getFreeAgents: function (positionDetails) {
        var query = "SELECT score, salary, PositionId, UserPositions.UserId, email, name, title, Availabilities.startTime, Availabilities.endTime, Availabilities.day FROM UserPositions"
                    + " LEFT OUTER JOIN Users ON UserPositions.UserId = Users.id"
                    + " LEFT OUTER JOIN Positions ON UserPositions.PositionId = Positions.id"
                    + " LEFT OUTER JOIN Availabilities ON UserPositions.UserId = Availabilities.UserId"
                    + " WHERE UserPositions.UserId NOT IN ("
                    + "   SELECT UserGigs.UserId FROM UserGigs LEFT OUTER JOIN Gigs on UserGigs.GigId = Gigs.id LEFT OUTER JOIN Users on UserGigs.UserId = Users.id WHERE Gigs.date = '2015-09-14'"
                    + " )"
                    + "   AND UserPositions.PositionId ='" + positionDetails.positionId + "'"
                    + "   AND Availabilities.day = DAYOFWEEK('" + positionDetails.date + "')"
                    + "   AND Availabilities.startTime < '12:00:00'"
                    + "   AND Availabilities.endTime > '12:00:00'"
                    + " ORDER BY UserPositions.score DESC;"
        return sequelize
          .query(query)
          .spread(function(results, metadata) {
            return(results);
          });
      }
    }
  });
  return UserPositions;
};