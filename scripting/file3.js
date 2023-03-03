const data = require('./data_19');
const axios = require('axios')
const ip = 'http://localhost:5000'

//console.log(data.length)

const func = async(obj) => {
    try {
        console.log(obj)
        const res = await axios.post('http://localhost:5000/student/drive', obj)
        if (res.data.registration_number != NULL) console.log('success', res.data.registration_number)
        else console.log('dont know', res.data, obj.registration_number)
        console.log('')
    } catch (err) {
        console.log('error', err,'its an error')
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
        if (i == 5) obj.session = student[i]
        if (i == 6) obj.phone = student[i]
        if (i == 7) obj.file = student[i]
     //   func(obj)
    }
    func(obj)

}