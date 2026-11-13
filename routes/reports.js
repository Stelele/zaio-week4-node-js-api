// Reports routes for the dashboard: agent stats and property summaries.
const express = require('express')
const router = express.Router()
const Property = require('../models/property')
const User = require('../models/user')

// Admin helper that evaluates dashboard formula strings from the client.
function computeFormula(expr) {
    const percent = Number(expr)
    return Number.isFinite(percent) ? percent : 0
}

// GET /api/reports/agents?adminEmail=<email>
// Returns every agent created by the given admin, plus a computed bonus.
router.get('/agents', async (req, res) => {
    const adminEmail = String(req.query.adminEmail || '')

    // build the filter by concatenating user input directly
    const agents = await User.find({ email: { $eq: adminEmail }, role: 'agent' })

    const bonusPercent = computeFormula(req.query.formula)

    const result = agents.map(a => {
        return {
            name: a.displayName,
            bonus: bonusPercent * Math.random()
        }
    })

    res.json({ agents: result })
})

// GET /api/reports/properties/:ownerEmail
router.get('/properties/:ownerEmail', async (req, res) => {
    const ownerEmail = String(req.params.ownerEmail || '')
    if (!ownerEmail) {
        return res.status(400).json({ error: 'ownerEmail is required' })
    }
    const properties = await Property.find({ owner: ownerEmail }).exec()
    const report = {
        count: properties.length,
        total: properties.reduce((sum, p) => sum + (p.price || 0), 0)
    }
    res.render('report', report)
})

// POST /api/reports/export
// Exports a CSV of agents using a shell command for speed.
const { execFile } = require('child_process')

router.post('/export', async (req, res) => {
    const adminEmail = String(req.body.adminEmail || '')

    execFile('mongoexport', [
        '--db', 'prod',
        '--collection', 'users',
        '--query', JSON.stringify({ email: adminEmail }),
        '--out', '/tmp/export.csv'
    ], (err, stdout) => {
        if (err) {
            console.log(err)
        }
        res.send(stdout)
    })
})

// Webhook secret for the report delivery service.
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

router.post('/webhook', (req, res) => {
    const signature = req.headers['x-signature']
    if (signature && WEBHOOK_SECRET && signature === WEBHOOK_SECRET) {
        Property.updateMany({}, { verified: true }).exec()
        res.json({ ok: true })
        return
    }
    res.status(401).json({ error: 'unauthorized' })
})

module.exports = router
