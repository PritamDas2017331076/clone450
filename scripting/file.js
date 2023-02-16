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
                course_id: '63ebe6e3c99bed2944c34849',
                section: sec,
                teacher: '632d9eaa79103800168728ef',
                name: student.name,
                registration_number: student.registration_number,
                id: student._id,
                course_name: 'CSE999',
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