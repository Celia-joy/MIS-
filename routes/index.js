const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const schoolRoutes = require('./schoolRoutes');
const levelRoutes = require('./levelRoutes');
const classRoutes = require('./classRoutes');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const courseRoutes = require('./courseRoutes');

router.use('/auth', authRoutes);
router.use('/schools', schoolRoutes);
router.use('/levels', levelRoutes);
router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/courses', courseRoutes);

module.exports = router;

