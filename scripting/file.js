const data = require('./data');
const axios = require('axios')
const ip = 'http://localhost:5000'

//console.log(data.length)

const func = async() => {
    try {
        const res = await axios.get('http://localhost:5000/student?university=SUST&department=CSE')
            //console.log('success', res.data)
        let list = res.data
        let ct = 1
            //console.log(list)
        for (let student of list) {
            // console.log(student)
            let sec = 'B'
            let x = (student.registration_number * 1) % 10
            if ((x * 1) % 2) sec = 'A'
            const obj = {
                course_id: '6351700852f31974bec41f04',
                section: sec,
                teacher: '6351603f52f31974bec41b07',
                name: student.name,
                registration_number: student.registration_number,
                id: student._id,
                course_name: 'Demo',
                university: 'SUST',
                avatar: student.avatar
            }
            try {
                const rsp = await axios.post(`http://localhost:5000/access/add`, obj)
                console.log('success', ct)
                ct = ct * 1 + 1
            } catch (e) {
                console.log('failure', obj)

            }
        }
    } catch (e) {
        console.log('failure', e)
    }

}

func()