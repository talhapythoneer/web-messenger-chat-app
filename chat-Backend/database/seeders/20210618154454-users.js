'use strict';
const bcrypt = require("bcrypt");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("Users", [{
                firstName: "Talha",
                lastName: "Irfan",
                email: "talhairfan99@gmail.com",
                password: bcrypt.hashSync("secret", 10),
                gender: "male",
            },
            {
                firstName: "Masab",
                lastName: "Irfan",
                email: "masabirfan99@gmail.com",
                password: "numpy",
                gender: "male",
            },

        ])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};