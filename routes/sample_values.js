import express from 'express'



const sampleValuesRouter = express.Router()

sampleValuesRouter.get('/value-types/branch', (req, res) => {
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

sampleValuesRouter.get('/value-types/region', (req, res) => {
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

sampleValuesRouter.get('/value-types/time', (req, res) => {
    res.json([
        {
            label: "05:00 AM",
            value: "05:00 AM"
        },
        {
            label: "06:00 AM",
            value: "06:00 AM"
        },
        {
            label: "07:00 AM",
            value: "07:00 AM"
        },
        {
            label: "08:00 AM",
            value: "08:00 AM"
        },
        {
            label: "09:00 AM",
            value: "09:00 AM"
        },
        {
            label: "10:00 AM",
            value: "10:00 AM"
        },
        {
            label: "11:00 AM",
            value: "11:00 AM"
        },
        {
            label: "12:00 PM",
            value: "12:00 PM"
        },
        {
            label: "01:00 PM",
            value: "01:00 PM"
        },
        {
            label: "02:00 PM",
            value: "02:00 PM"
        },
        {
            label: "03:00 PM",
            value: "03:00 PM"
        },
        {
            label: "04:00 PM",
            value: "04:00 PM"
        },
        {
            label: "05:00 PM",
            value: "05:00 PM"
        },
        {
            label: "06:00 PM",
            value: "06:00 PM"
        },
        {
            label: "07:00 PM",
            value: "07:00 PM"
        },
        {
            label: "08:00 PM",
            value: "08:00 PM"
        },
    ])
})

export default sampleValuesRouter