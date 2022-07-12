'use strict';

const { DataType } = require('sequelize-typescript');
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((transaction) => {
            const transitionHost = { transaction };
            return Promise.all([
                queryInterface.createTable(
                    'users',
                    {
                        id: {
                            type: DataType.UUID,
                            unique: true,
                            primaryKey: true,
                            defaultValue: DataType.UUIDV4,
                        },
                        firstName: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        lastName: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        username: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        password: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        email: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        phone: {
                            type: DataType.STRING,
                            allowNull: false,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    }
                    ,
                    transitionHost,
                ),
            ]);
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((transaction) => {
            const transitionHost = { transaction };
            return Promise.all([
                queryInterface.dropTable('users', transitionHost),
            ]);
        });
    },
};
