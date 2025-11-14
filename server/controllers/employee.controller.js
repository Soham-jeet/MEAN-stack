const express = require('express');
const router = express.Router();
const objetctId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.model');
//const {} 

//get routes
router.get('/', (req, res) => {
    // res.send('Employee API is working properly');
    Employee.find()
        .then(data => res.send(data))
        .catch((err) => console.log(err));
})

//post routes
router.post('/', (req, res) => {
    // console.log(req.body);

    const newRecord = {
        fullName: req.body.fullName,
        position: req.body.position,
        location: req.body.location,
        salary: req.body.salary
    }
    Employee.create(newRecord)
        .then(data => res.send(data))
        .catch((err) => console.log(err));
})

//find by id routes
router.get('/:id', (req, res) => {
    if (objetctId.isValid(req.params.id) == false)
        return res.status(400).send('Bad id records with given id : ' + req.params.id);
    else
        Employee.findById(req.params.id)
            .then(data => {
                if (data)
                    res.send(data);
                else
                    res.status(404).send('Employee is not in the list with id : ' + req.params.id);
            })
            .catch((err) => console.log(err));
})

//update the routes
router.put('/:id', async (req, res) => {
    if (objetctId.isValid(req.params.id) == false)
        return res.status(400).send('Bad id records with given id : ' + req.params.id);
    else
        try {
            const { id } = req.params;
            //const updates = req.body;
            const newRecord = {
                fullName: req.body.fullName,
                position: req.body.position,
                location: req.body.location,
                salary: req.body.salary
            }

            const employee = await Employee.findByIdAndUpdate(id, newRecord, { new: true });
            if (!employee) return res.status(404).json({ message: "Employee not found" });

            res.status(200).json(employee);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
})

router.delete('/:id', async (req, res) => {
    if (!objetctId.isValid(req.params.id))
        return res.status(400).send('Bad id records with given id : ' + req.params.id);
    else
        try {
            const { id } = req.params;
            const employee = await Employee.findByIdAndDelete(id);
            if (!employee) return res.status(404).json({ message: 'Employee not found' });

            res.json({
                message: 'Employee deleted successfully',
                employee
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
})


//find by name routes
// GET /api/employees?fullName=Rehan
// router.get("/", async (req, res) => {
//   try {
//     const { fullName } = req.query;

//     // ⚠️ Prevent empty query from returning all records
//     if (!fullName || fullName.trim() === "") {
//       return res.status(400).json({ message: "Please provide a fullName" });
//     }

//     // ✅ Fetch all employees matching fullName (case-insensitive)
//     const employees = await Employee.find({
//       fullName: { $regex: new RegExp(`^${fullName}$`, "i") }
//     });

//     if (employees.length === 0) {
//       return res.status(404).json({ message: "No employee found with that name" });
//     }

//     res.json(employees); // return only matched ones
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// })

module.exports = router;