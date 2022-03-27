module.exports = (connection, DataTypes) => {
    const model = connection.define('Carrinho',
    {   id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        produto_id: DataTypes.INTEGER,
        usuario_id: DataTypes.INTEGER,
    },
    {timestamps: false,
     tableName: 'carrinhos'
    })

    model.sync({ alter: true })
    return model
}