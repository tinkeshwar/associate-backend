'use strict'

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    const { DataTypes } = Sequelize
    await QueryInterface.createTable('associate_specialization', {
      associateId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'associate_id',
        primaryKey: true,
        references: {
          model: {
            tableName: 'associates'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      specializationId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'specialization_id',
        primaryKey: true,
        references: {
          model: {
            tableName: 'specializations'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
    })
  },

  down: async (QueryInterface) => {
    await QueryInterface.dropTable('associate_specialization')
  }
}
