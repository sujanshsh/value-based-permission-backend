import express from 'express'



const sampleValuesRouter = express.Router()

sampleValuesRouter.get('/value-types/branches', (req, res) => {
    res.json([
        {
            label: "Branch A",
            value: 1
        },
        {
            label: "Branch B",
            value: 2
        },
        {
            label: "Branch C",
            value: 3
        }
    ])
})

sampleValuesRouter.get('/value-types/regions', (req, res) => {
    res.json([
        {
            label: "Asia",
            value: 1
        },
        {
            label: "Europe",
            value: 2
        },
        {
            label: "USA",
            value: 3
        }
    ])
})

export default sampleValuesRouter