const { DataTypes, Op } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    await queryInterface.addConstraint('blogs', {
      fields: ['year'],
      type: 'check',
      where: {
        year: {
          [Op.between]: [1991, new Date().getFullYear()]
        }
      }
    })

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}