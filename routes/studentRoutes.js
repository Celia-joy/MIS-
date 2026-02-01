const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createStudentSchema, updateStudentSchema } = require('../validations/studentValidation');

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 */
router.get('/', auth, studentController.getAllStudents);
router.post('/', auth, validate(createStudentSchema), studentController.createStudent);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 */
router.get('/:id', auth, studentController.getStudentById);
router.put('/:id', auth, validate(updateStudentSchema), studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);

module.exports = router;

