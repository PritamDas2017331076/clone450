const data = require('./data');
const axios = require('axios')
const ip = 'http://localhost:5000'

//console.log(data.length)

const func = async(obj) => {
    try {
        const res = await axios.post('http://localhost:5000/student/drive', obj)
        console.log('success')
    } catch (err) {
        console.log('error', e)
        console.log(obj)
    }

}

for (let student of data) {
    const obj = {
        email: '99',
        registration_number: '839904',
        name: 'kklc',
        university: 'SUST',
        department: 'CSE',
        session: '9303',
        phone: '9304',
        file: 'kdjk',
        password: '1111'
    }
    for (let i = 1; i <= 8; i++) {
        if (i == 1) obj.email = student[i]
        if (i == 2) obj.registration_number = student[i]
        if (i == 3) obj.name = student[i]
        if (i == 6) obj.session = student[i]
        if (i == 7) obj.phone = student[i]
        if (i == 8) obj.file = student[i]
        func(obj)
    }

}