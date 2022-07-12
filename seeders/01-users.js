// noinspection SpellCheckingInspection

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const date = new Date;
        const password = '$2a$12$2bfQS86BVIAKcDr5to5Ltu2K3cK39jonGg38G5j9LfDi2P0OpOx6.';
        const users = [
            {
                id: '84a08066-f75c-4b6a-8ea9-bbd86961423d',
                firstName: 'Agreena',
                lastName: 'User1',
                username: 'agreena.user1',
                password,
                email: 'agreena.user1@gmail.com',
                phone: '+380111111111',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: 'a4478986-5089-4726-ab20-214c34b7902a',
                firstName: 'Agreena',
                lastName: 'User2',
                username: 'agreena.user2',
                password,
                email: 'agreena.user2@gmail.com',
                phone: '+380222222222',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: '82a834d9-501b-48bc-8967-69a29ce20cf0',
                firstName: 'Agreena',
                lastName: 'User3',
                username: 'agreena.user3',
                password,
                email: 'agreena.user3@gmail.com',
                phone: '+380333333333',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: 'f76672c0-c13c-4150-926a-67a567211369',
                firstName: 'Agreena',
                lastName: 'User4',
                username: 'agreena.user4',
                password,
                email: 'agreena.user4@gmail.com',
                phone: '+380444444444',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: '76da5cbd-d613-4d0d-b341-e44d8888feaf',
                firstName: 'Agreena',
                lastName: 'User5',
                username: 'agreena.user5',
                password,
                email: 'agreena.user5@gmail.com',
                phone: '+380555555555',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: 'c30096d5-f4dd-4789-aa22-f658c1d6a9f8',
                firstName: 'Agreena',
                lastName: 'User6',
                username: 'agreena.user6',
                password,
                email: 'agreena.user6@gmail.com',
                phone: '+380666666666',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: '73021567-2f37-45cb-8aa9-291eccdfef8c',
                firstName: 'Agreena',
                lastName: 'User7',
                username: 'agreena.user7',
                password,
                email: 'agreena.user7@gmail.com',
                phone: '+380777777777',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: '197403fc-6b85-4e82-b557-532d160da416',
                firstName: 'Agreena',
                lastName: 'User8',
                username: 'agreena.user8',
                password,
                email: 'agreena.user8@gmail.com',
                phone: '+380888888888',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: '95da01da-58dc-4d10-a3bb-0385af6186fe',
                firstName: 'Agreena',
                lastName: 'User9',
                username: 'agreena.user9',
                password,
                email: 'agreena.user9@gmail.com',
                phone: '+380999999999',
                createdAt: date,
                updatedAt: date,
            },
            {
                id: 'e1fdcef5-8efb-4c90-8b77-2aced3d0a87f',
                firstName: 'Agreena',
                lastName: 'User10',
                username: 'agreena.user10',
                password,
                email: 'agreena.user10@gmail.com',
                phone: '+380999999991',
                createdAt: date,
                updatedAt: date,
            },
        ];

        await queryInterface.bulkInsert('users', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
