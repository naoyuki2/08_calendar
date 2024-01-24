import { isSameDay, isSaturday, isSunday, isToday } from 'date-fns'
import { useState } from 'react'

type Props = {
    year: number
    month: number
    day: number
}

type TaskType = {
    id: number
    title: string
    date: Date
}

const testTasks = [
    {
        id: 1,
        title: 'タスク1',
        date: new Date(2024, 0, 24),
    },
]

const CalendarCell = ({ year, month, day }: Props) => {
    const [tasks, setTasks] = useState<TaskType[]>(testTasks)

    const isTod = isToday(new Date(year, month - 1, day))

    const isSat = isSaturday(new Date(year, month - 1, day))

    const isSun = isSunday(new Date(year, month - 1, day))

    let cellClassName =
        'shadow-md rounded-md p-5 text-center cursor-pointer hover:bg-slate-100 text-xl'
    if (day <= 31) {
        if (isTod) {
            cellClassName += ' bg-green-200'
        } else if (isSat) {
            cellClassName += ' bg-blue-200'
        } else if (isSun) {
            cellClassName += ' bg-red-200'
        }
    }

    return (
        <>
            {day <= 31 ? (
                <div className={cellClassName}>
                    {day}
                    {tasks.map((task) => {
                        return (
                            isSameDay(
                                task.date,
                                new Date(year, month - 1, day),
                            ) && (
                                <div
                                    key={task.id}
                                    className="text-xs text-red-500"
                                >
                                    {task.title}
                                </div>
                            )
                        )
                    })}
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default CalendarCell
