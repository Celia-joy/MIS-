const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { createLevelSchema, updateLevelSchema } = require('../validations/levelValidation');

/**
 * @swagger
 * /api/v1/levels:
 *   get:
 *     summary: Get all levels
 *     tags: [Levels]
 *   post:
 *     summary: Create a new level
 *     tags: [Levels]
 */
router.get('/', auth, levelController.getAllLevels);
router.post('/', auth, validate(createLevelSchema), levelController.createLevel);

/**
 * @swagger
 * /api/v1/levels/{id}:
 *   get:
 *     summary: Get level by ID
 *     tags: [Levels]
 *   put:
 *     summary: Update level
 *     tags: [Levels]
 *   delete:
 *     summary: Delete level
 *     tags: [Levels]
 */
router.get('/:id', auth, levelController.getLevelById);
router.put('/:id', auth, validate(updateLevelSchema), levelController.updateLevel);
router.delete('/:id', auth, levelController.deleteLevel);

module.exports = router;

