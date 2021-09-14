const entities = []
const now = new Date()

entities.push({ name: 'Angular', created_at: now, updated_at: now })
entities.push({ name: 'ASP.Net', created_at: now, updated_at: now })
entities.push({ name: 'Web API', created_at: now, updated_at: now })
entities.push({ name: 'Knockout', created_at: now, updated_at: now })
entities.push({ name: 'SharePoint', created_at: now, updated_at: now })
entities.push({ name: 'Nodejs', created_at: now, updated_at: now })
entities.push({ name: 'React.js', created_at: now, updated_at: now })

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('specializations', entities)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('specializations', {
      name: { [Sequelize.Op.in]: entities.map(entity => entity.name) }
    }, {})
  }
}
