module.exports = (connection, DataTypes) => {
    const model = connection.define('Usuario',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome:{
                type: DataTypes.STRING(50)
            },
            email:{
                type: DataTypes.STRING(60)
            },
            senha:{
                type: DataTypes.STRING(15)
            },
            categoria:{
                type: DataTypes.STRING(10)
            }
    },{
        timestamps: true,
        tableName: 'usuarios'
    });
    model.sync({alter: true})
    return model
};