'use strict';

const { v4: uuidv4 } = require('uuid');
module.exports = {
    async up(queryInterface, Sequelize) {
        const ownerIds = [
            '84a08066-f75c-4b6a-8ea9-bbd86961423d',
            'a4478986-5089-4726-ab20-214c34b7902a',
            '82a834d9-501b-48bc-8967-69a29ce20cf0',
            '76da5cbd-d613-4d0d-b341-e44d8888feaf',
            'f76672c0-c13c-4150-926a-67a567211369',
        ];
        const date = new Date;
        const certificates = [];
        for (let i = 0; i < 100; i++) {
            const certificate = {
                id: uuidv4(),
                country: 'Ukraine',
                status: 'Available',
                createdAt: date,
                updatedAt: date,
            };
            if (ownerIds[i]) {
                certificate.status = 'Owned';
                certificate.ownerId = ownerIds[i];
            }
            certificates.push(certificate);
        }

        await queryInterface.bulkInsert('certificates', certificates, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('certificates', null, {});
    },
};
