let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const Student = require('../db/Student');
const cloudinary = require('../helper/imageUpload')
const authStudent = require('../middleware/authStudent');
const auth = require('../middleware/authStudent')
const Universities = require('../db/Universities')
const Departments = require('../db/Departments')
const jwt = require('jsonwebtoken');
const SALT_FACTOR = 10;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// const storage = multer.diskStorage({});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb('invalid image file!', false);
//     }
// };
// const upload = multer({ storage, fileFilter });

router.use(express.json())
router.route('/').get((req, res) => {
    const uni = req.query.university
    const dept = req.query.department
    Student.find({ university: uni, department: dept })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
})



router.get('/me', authStudent, async(req, res) => {
    try {
        res.status(200).send(req.student)
    } catch (e) {
        res.status(500).send()
    }
})

const nodemailer = require("nodemailer");
const config = require("../config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

const ip = require('../ip')

const sendConfirmationEmail = (name, email, secret) => {
    console.log("Check ", secret, user, email, pass);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `
        <html>
          <body>
            <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <p>http://localhost:5000/approveS/${secret}</p>
          </body>
        </html>`,
    }).catch(err => {
        console.log('err', err)
    });
};

// add this just
const sendPasswordUpdateEmail = (email, password, post, secret, name) => {
    console.log("Check ", secret, user, email, pass);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Password Changing Alert",
        html: `
        <html>
          <body>
          <h1>Hello ${name}</h1>
          <h2>Click the link below to change your password. If you have not asked to change your password then ignore this mail</h2>
          <p>http://localhost:5000/${post}/${password}/${secret}</p>
          </body>
        </html>`,
    }).catch(err => {
        console.log('err', err)
    });
};
const bcrypt = require('bcryptjs');
router.get('/:password/:secret', async(req, res) => {
    let f = 0
    const psw = await bcrypt.hash(req.params.password, 8);

    try {
        const ress = await Student.findOne({ secret: req.params.secret }) // 1 change
        console.log('donee', ress)
        const pass = { password: psw }
        const student = await Student.findByIdAndUpdate(ress._id, pass, { new: true, runValidators: true }) //2 change

        console.log('result which I wanted to observe', student) //1 change
        res.status(200).send(student) //1 change
        if (res != null) console.log('got one')
        f = 1
    } catch (e) {
        console.log('student doesss not exit', e) //1 change
    }

})
router.post('/pass', async(req, res) => {
    const email = req.body.email
    const post = req.body.post
    const password = req.body.password
    let student //1 change
    let f = 0

    try {
        const res = await Student.findOne({ email: email }) //1 chnage
        student = res //1 change
        console.log('result which I want to observe', res)
        if (res != null) console.log('got one')
        f = 1
    } catch (e) {
        console.log('student does not exit', e) //1 change
    }
    // console.log('fff', f)
    if (!f) {
        console.log('ft', f)
        res.status(200).send('student exists') //1 change
        return
    }
    try {
        sendPasswordUpdateEmail(
            student.email,
            password,
            student.post,
            student.secret,
            student.name,
        ); // 4 chnages

        console.log('Student', student) //2 chnages
        res.status(200).send(student) //2 changes
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }

})

router.post('/add', upload.single('avatar'), async(req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const university = req.body.university;
    const department = req.body.department;
    const password = req.body.password;
    const post = 'student'
    const activated = false
    const registration_number = req.body.registration_number
    const session = req.body.session
    const status = false
    const secret = await jwt.sign({ email: email }, 'thisisnewstudent')
    const avatar = url + '/public/' + req.file.filename
    let f = 0

    try {
        const res = await Student.findOne({ email: email })
        console.log('result which I want to observe', res)
        if (res != null) console.log('got one')
        if (res != null) {
            f = 1
        }
    } catch (e) {
        console.log('student is used', e)
    }
    // console.log('fff', f)
    if (f) {
        console.log('ft', f)
        res.status(200).send('student exists')
        return
    }


    const newStudent = new Student({ email, name, phone, secret, status, university, avatar, department, post, activated, password, registration_number, session });
    console.log(newStudent)


    try {
        await newStudent.save((err) => {
            if (err) {
                console.log('error got here1', err)
                res.status(500).send({ message: err });
                return;
            }


            console.log('sending mail')


            sendConfirmationEmail(
                newStudent.name,
                newStudent.email,
                newStudent.secret
            );
        })
        console.log('Student', newStudent)
        res.status(200).send(newStudent)
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }
})

router.patch('/avatar/:id', upload.single('avatar'), async(req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const avatar = url + '/public/' + req.file.filename
    const object = { avatar: avatar }
    try {
        console.log(avatar, req.params.id)
        const student = await Student.findByIdAndUpdate(req.params.id, object, { new: true, runValidators: true })
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// router.post('/add', upload.single('avatar'), async(req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const university = req.body.university;
//     const department = req.body.department;
//     const password = req.body.password;
//     const post = 'student'
//     const activated = false
//     const registration_number = req.body.registration_number
//     const session = req.body.session
//     const status = false
//     const secret = await jwt.sign({ email: email }, 'thisisnewstudent')
//     console.log(name, email, phone, university, department, registration_number, )
//     let f = 0

//     try {
//         const res = await Student.findOne({ email: email })
//         console.log('result which I want to observe', res)
//         if (res != null) console.log('got one')
//         if (res != null) {
//             f = 1
//         }
//     } catch (e) {
//         console.log('student is used', e)
//     }
//     // console.log('fff', f)
//     if (f) {
//         console.log('ft', f)
//         res.status(200).send('student exists')
//         return
//     }
//     console.log('request', JSON.stringify(req.body), req.body.files, req.file)
//     let image
//     try {
//         image = await cloudinary.uploader.upload(req.file.path, {
//             public_id: `${secret}_profile`,
//             width: 100,
//             height: 100,
//             crop: 'fill',
//         });
//         console.log('image', image)
//     } catch (error) {
//         res
//             .status(500)
//             .json({ success: false, message: 'server error, try after some time' });
//         console.log('Error while uploading profile image', error.message);
//     }
//     const avatar = image.url

//     const newStudent = new Student({ email, name, phone, secret, status, university, avatar, department, post, activated, password, registration_number, session });
//     console.log(newStudent)

//     try {
//         await newStudent.save((err) => {
//             if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//             }

//             console.log('sending mail')

//             sendConfirmationEmail(
//                 newStudent.name,
//                 newStudent.email,
//                 newStudent.secret
//             );
//         })
//         console.log('Student', newStudent)
//         res.status(200).send(newStudent)
//     } catch (e) {
//         console.log(e.message)
//         res.status(400).send(e);
//     }
// })

router.post('/addd', upload.single('avatar'), async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const university = req.body.university;
    const department = req.body.department;
    const password = req.body.password;
    const post = 'student'
    const activated = true
    const registration_number = req.body.registration_number
    const session = req.body.session
    const status = true
    const secret = await jwt.sign({ email: email }, 'thisisnewstudent')
    console.log(name, email, phone, university, department, registration_number, )
    let f = 0

    try {
        const res = await Student.findOne({ email: email })
        console.log('result which I want to observe', res)
        if (res != null) console.log('got one')
        if (res != null) {
            f = 1
        }
    } catch (e) {
        console.log('student is used', e)
    }
    // console.log('fff', f)
    if (f) {
        console.log('ft', f)
        res.status(200).send('student exists')
        return
    }
    console.log('request', JSON.stringify(req.body), req.body.files, req.file)
    let image
    try {
        image = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${secret}_profile`,
            width: 100,
            height: 100,
            crop: 'fill',
        });
        console.log('image', image)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: 'server error, try after some time' });
        console.log('Error while uploading profile image', error.message);
    }
    const avatar = image.url

    const newStudent = new Student({ email, name, phone, secret, status, university, avatar, department, post, activated, password, registration_number, session });
    console.log(newStudent)

    try {
        await newStudent.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
        console.log('Student', newStudent)
        res.status(200).send(newStudent)
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }
})

router.post('/drive', async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const university = req.body.university;
    const department = req.body.department;
    const password = req.body.password;
    const post = 'student'
    const activated = true
    const registration_number = req.body.registration_number
    const session = req.body.session
    const status = true
    const secret = await jwt.sign({ email: email }, 'thisisnewstudent')
    const avatar = req.body.file
    console.log(name, email, phone, university, department, registration_number, avatar)
    let f = 0

    try {
        const res = await Student.findOne({ email: email })
        console.log('result which I want to observe', res)
        if (res != null) console.log('got one')
        if (res != null) {
            f = 1
        }
    } catch (e) {
        console.log('student is not used', e)
    }
    // console.log('fff', f)
    if (f) {
        console.log('ft', f)
        res.status(400).send('student exists')
        return
    }
    //console.log('request', JSON.stringify(req.body), req.body.files, req.file)
    /*let image
    try {
        image = await cloudinary.v2.uploader.upload(file);
        console.log('image', image)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: 'server error, try after some time' });
        console.log('Error while uploading profile image', error.message);
    }*/

    const newStudent = new Student({ email, name, phone, secret, status, university, avatar, department, post, activated, password, registration_number, session });
    console.log(newStudent)

    try {
        await newStudent.save((err) => {
            if (err) {
                console.log('error occurred')
                res.status(500).send({ message: err });
                return;
            }
        })
        console.log('Student', newStudent)
        res.status(200).send(newStudent)
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }
})



router.route('/login').post(async(req, res) => {
    try {
        console.log(req.body.email, req.body.password)
        const student = await Student.findByCredentials(req.body.email, req.body.password)
        if (student == -1) {
            console.log(student)
            res.status(403).send('Email or Password not matched')
        }
        if (student.activated == false) {
            console.log('not activated')
            res.status(403).send('Id is not activated')
            return
        } else {
            const token = await student.generateAuthToken()
            const post = student.post
            const university = student.university
            const department = student.department
            const name = student.name
            const email = student.email
            const id = student._id
            const avatar = student.avatar
            console.log(student)
            res.status(200).send({ student, avatar, token, post, university, department, name, email, id })
        }
    } catch (e) {
        res.status(400).json(e)
    }
})

// router.patch('/upload-photo', authStudent, uploads.single('avatar'), async(req, res) => {
//     const studen = req.student
//     if (!studen) res.status(403).send('student not found')
//     else {
//         try {
//             const photo = req.file.buffer
//             const image = await sharp(photo).metadata()
//             const avatar = await sharp(photo).resize(2, 2).toBuffer()
//             const ava = Buffer.from(avatar, 'binary')
//             console.log('iamhere')
//             console.log('avatar and student ', avatar, studen)
//             const chg = {
//                 avatar: ava
//             }
//             console.log('data to update', chg)
//             const student = Student.findByIdAndUpdate(studen._id, chg, { new: true, runValidators: true })
//             console.log(studen)
//             res.status(201).send(studen)
//         } catch (e) {
//             console.log('error occurred', e.message, studen)

//         }


//     }
// })

router.get('/logout', authStudent, async(req, res) => {
    console.log(req.student)
    try {
        req.student.tokens = req.student.tokens.filter(token => token.token !== req.token)
            //req.user.tokens = []
        await req.student.save();
        res.status(200).send(req.student)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async(req, res) => {
    console.log(req.params)
    try {
        const student = await Student.findById(req.params.id)
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.route('/deleteAll').delete((req, res) => {
    const uni = req.body.session
    try{
        const ress=Student.deleteMany({session:'2019-20'})
        res.status(200).send(ress)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;