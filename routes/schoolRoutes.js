const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createSchoolSchema, updateSchoolSchema } = require('../validations/schoolValidation');

/**
 * @swagger
 * /api/v1/schools:
 *   get:
 *     summary: Get all schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: List of schools
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               principalName:
 *                 type: string
 *               establishedYear:
 *                 type: integer
 */
router.get('/', auth, schoolController.getAllSchools);
router.post('/', auth, validate(createSchoolSchema), schoolController.createSchool);

/**
 * @swagger
 * /api/v1/schools/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update school
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete school
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', auth, schoolController.getSchoolById);
router.put('/:id', auth, validate(updateSchoolSchema), schoolController.updateSchool);
router.delete('/:id', auth, schoolController.deleteSchool);

module.exports = router;

