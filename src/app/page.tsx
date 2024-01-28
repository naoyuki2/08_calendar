'use client'

import { useState } from 'react'
import Header from './components/Header'
import { OneOrMinus, TaskType } from './type/type'
import { getDay, getDaysInMonth } from 'date-fns'
import CalendarCell from './components/CalendarCell'

const testTasks = [
    {
        id: 1,
        title: 'タスク1',
        date: new Date(2024, 0, 24),
        isEdit: false,
    },
    {
        id: 2,
        title: 'タスク2',
        date: new Date(2024, 0, 26),
        isEdit: false,
    },
    {
        id: 3,
        title: 'タスク3',
        date: new Date(2024, 1, 26),
        isEdit: false,
    },
]

export default function Home() {
    const [tasks, setTasks] = useState<TaskType[]>(testTasks)
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
    const daysInMonth = getDaysInMonth(new Date(year, month - 1)) // 月の日数
    const startDayOfWeek = getDay(new Date(year, month - 1, 1)) // 月の最初の日の曜日

    const dayArray = Array(startDayOfWeek)
        .fill(null)
        .map((_, i) => i + 41) // 41, 42, 43, ...
        .concat([...Array(daysInMonth)].map((_, i) => i + 1))

    return (
        <>
            <Header month={month} year={year} handleDate={handleDate} />
            <div className="grid grid-cols-7 gap-1 my-3">
                {dayArray.map((day) => (
                    <CalendarCell
                        key={day}
                        year={year}
                        month={month}
                        day={day}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                ))}
            </div>
        </>
    )
}
