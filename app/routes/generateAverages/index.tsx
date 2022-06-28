import React from 'react'
import subjects from '../../utils/subjects.json'

const allSubjects = subjects.map((s) => {
    return (
        {
            "content": parseFloat((Math.random() * (5.75 - 2.35) + 2.35).toFixed(2)),
            "subjectName": s.name,
            "subject": s.slug
        }
    )
})

const index = () => {
    console.log(subjects.map((s) => {
        return (
            {
                "content": parseFloat((Math.random() * (5.75 - 2.35) + 2.35).toFixed(2)),
                "subjectName": s.name,
                "subject": s.slug
            }
        )
    }), subjects.map((s) => {
        return (
            {
                "content": parseFloat((Math.random() * (5.75 - 2.35) + 2.35).toFixed(2)),
                "subjectName": s.name,
                "subject": s.slug
            }
        )
    }),
        subjects.map((s) => {
            return (
                {
                    "content": parseFloat((Math.random() * (5.75 - 2.35) + 2.35).toFixed(2)),
                    "subjectName": s.name,
                    "subject": s.slug
                }
            )
        }))
    return (
        <>
            {subjects.map((s) => {
                return (
                    {
                        "content": parseFloat((Math.random() * (5.75 - 2.35) + 2.35).toFixed(2)),
                        "subjectName": s.name,
                        "subject": s.slug
                    }
                )
            }).toString}
        </>
    )
}

export default index