const mongoose = require('mongoose');
const Admin = require('./Model/userModel');
const bcrypt = require('bcrypt');
mongoose.connect("mongodb+srv://francisstackup:mongoconnect2@crudcluster.nzbwsqx.mongodb.net/ecommrce?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const adminSeed = async () => {
    try {
        const email = 'francis15@gmail.com'; 
        const password = '15151'; 

        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Admin.create({
                username: 'Francis',
                email,
                password: hashedPassword,
                phone: '8590176418',
                role: 'admin',
            });

            console.log('Admin seed data inserted successfully.');
        } else {
            console.log('Admin user already exists.');
        }

    } catch (error) {
        console.error('Error seeding admin data:', error);
    } finally {
        mongoose.connection.close();
        console.log("disconnect");
    }
};

adminSeed();