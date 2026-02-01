const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createCourseSchema, updateCourseSchema } = require('../validations/courseValidation');

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 */
router.get('/', auth, courseController.getAllCourses);
router.post('/', auth, validate(createCourseSchema), courseController.createCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *   put:
 *     summary: Update course
 *     tags: [Courses]
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 */
router.get('/:id', auth, courseController.getCourseById);
router.put('/:id', auth, validate(updateCourseSchema), courseController.updateCourse);
router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router;

