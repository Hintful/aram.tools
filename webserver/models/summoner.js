export default (sequelize, DataTypes) => {
    const Summoners = sequelize.define('Summoners', {
        puuid: {
            allowNull: false,
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        level: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        profileIconId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    });
    Summoners.associate = (models) => {
        Summoners.belongsToMany(models.Matches, {
            through: 'MatchSummoners',
            as: 'matches',
            foreignKey: 'summonerId'
        });
    };
    return Users;
  };