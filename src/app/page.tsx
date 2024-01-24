'use client'

import { useState } from 'react'
import Header from './components/Header'
import { OneOrMinus } from './type/type'

export default function Home() {
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const handleDate = (n: OneOrMinus) => {
        if (month + n === 0) {
            setMonth(12)
            setYear(year - 1)
            return
        }
        if (month + n === 13) {
            setMonth(1)
            setYear(year + 1)
            return
        }
        setMonth(month + n)
    }
    return (
        <>
            <Header month={month} year={year} handleDate={handleDate} />
        </>
    )
}
