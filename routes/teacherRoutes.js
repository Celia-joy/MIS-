const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createTeacherSchema, updateTeacherSchema } = require('../validations/teacherValidation');

/**
 * @swagger
 * /api/v1/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 */
router.get('/', auth, teacherController.getAllTeachers);
router.post('/', auth, validate(createTeacherSchema), teacherController.createTeacher);

/**
 * @swagger
 * /api/v1/teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teachers]
 *   put:
 *     summary: Update teacher
 *     tags: [Teachers]
 *   delete:
 *     summary: Delete teacher
 *     tags: [Teachers]
 */
router.get('/:id', auth, teacherController.getTeacherById);
router.put('/:id', auth, validate(updateTeacherSchema), teacherController.updateTeacher);
router.delete('/:id', auth, teacherController.deleteTeacher);

module.exports = router;

