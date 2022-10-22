const data = require('./data');
const axios = require('axios')
const ip = 'http://localhost:5000'

//console.log(data.length)

const func = async() => {
    try {
        const res = await axios.get(`${ip}/access/teacher?teacher=6351603f52f31974bec41b07`)
            //console.log('success', res.data)
        let list = res.data
        let ct = 0
        let use
        let acc
            //console.log(list)
        for (let data of list) {
            const id = data.id;
            const un = data._id
                // console.log(id, un)
            try {
                const r1 = await axios.get(`${ip}/student/${id}`)
                use = r1.data
            } catch (e) {
                console.log('error while finding user')
            }
            try {
                const r2 = await axios.get(`${ip}/access/${un}`)
                acc = r2.data
            } catch (e) {
                console.log('error while getting access data')
            }
            // console.log('use', use)
            // console.log('acc', acc)
            ct = ct * 1 + 1;

            const chg = {
                    registration_number: use.registration_number,
                    id: use._id,
                    section: acc.section,
                    avatar: use.avatar,
                    session: use.session,
                    name: use.name
                }
                // console.log(chg)

            const chk = {
                section: acc.section,
                registration_number: use.registration_number,
                course_id: acc.course_id,
                course_name: acc.course_name,
                avatar: use.avatar,
                university: 'SUST',
                department: 'CSE',
                record: []
            }

            try {
                const r3 = await axios.patch(`${ip}/course/student/${acc.course_id}`, chg)
                console.log('success1', ct)
            } catch (e) {
                console.log('failure while inserting student in course')
            }
            try {
                const r4 = await axios.post(`${ip}/byreg/add`, chk)
                console.log('success2', ct)
            } catch (e) {
                console.log('failure while inserting student in byreg')
            }
            try {
                const r5 = await axios.delete(`${ip}/access/${un}`)
                console.log('success3', ct)
            } catch (e) {
                console.log('failure while inserting student in byreg')
            }
        }
    } catch (e) {
        console.log('failure', e)
    }

}

func()