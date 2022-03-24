module.exports = (connection, DataTypes) => {
    const model = connection.define('Categoria',
    {   id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataTypes.STRING(10),
    },
    {timestamps: false,
    tableName: 'categorias'
    })

    model.associate = models => {
        model.hasMany(models.Produto,
            {
                foreignKey: 'categoria_id',
                as: 'produtos'
            })
            model.sync({ alter: true })
    }

    return model
}