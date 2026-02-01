const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createClassSchema, updateClassSchema } = require('../validations/classValidation');

/**
 * @swagger
 * /api/v1/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 */
router.get('/', auth, classController.getAllClasses);
router.post('/', auth, validate(createClassSchema), classController.createClass);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *   put:
 *     summary: Update class
 *     tags: [Classes]
 *   delete:
 *     summary: Delete class
 *     tags: [Classes]
 */
router.get('/:id', auth, classController.getClassById);
router.put('/:id', auth, validate(updateClassSchema), classController.updateClass);
router.delete('/:id', auth, classController.deleteClass);

module.exports = router;

