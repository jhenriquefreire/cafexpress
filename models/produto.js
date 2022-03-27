module.exports = (connection, DataTypes) => {
    const model = connection.define('Produto',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            imagem:{
                type: DataTypes.STRING(100)
            },
            nome:{
                type: DataTypes.STRING(50)
            },
            descricao:{
                type: DataTypes.STRING(100)
            },
            preco:{
                type: DataTypes.DOUBLE
            },
            estoque:{
                type: DataTypes.INTEGER
            }
    },
    {  timestamps: true,
        tableName: 'produtos'
    })

    model.associate = models => {
        model.belongsTo(models.Categoria, 
        {
            foreignKey: 'categoria_id',
            as: 'categoria'
        })
        model.sync({alter: true})
        
        model.belongsToMany(models.Usuario,
            {
                through: models.Carrinho,
                foreignKey: 'produto_id',
                as: 'comprador'
            })            
    }
    return model
};