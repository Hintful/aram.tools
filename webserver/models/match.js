export default (sequelize, DataTypes) => {
    const Matches = sequelize.define('Matches', {
        id: {
            allowNull: false,
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        gameStartTimestamp: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        gameEndTimestamp: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        gameDuration: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        gameMode: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });
    Matches.associate = (models) => {
        Matches.belongsToMany(models.Matches, {
            through: 'MatchSummoners',
            as: 'participants',
            foreignKey: 'summonerId'
        });
    };
    return Users;
  };