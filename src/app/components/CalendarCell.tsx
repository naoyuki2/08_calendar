import { isSameDay, isSaturday, isSunday, isToday } from 'date-fns'
import { TaskType } from '../type/type'
import Modal from './Modal'

type Props = {
    year: number
    month: number
    day: number
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const CalendarCell = ({ year, month, day, tasks, setTasks }: Props) => {
    console.log(tasks)
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
                <>
                    <button
                        className={cellClassName}
                        onClick={() => {
                            const modal = document.getElementById('my_modal_1')
                            if (modal instanceof HTMLDialogElement) {
                                modal.showModal()
                            }
                        }}
                    >
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
                    </button>
                    <Modal
                        year={year}
                        month={month}
                        day={day}
                        setTasks={setTasks}
                    />
                </>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default CalendarCell
