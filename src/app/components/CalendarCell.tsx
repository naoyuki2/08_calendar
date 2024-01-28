import { isSameDay, isSaturday, isSunday, isToday } from 'date-fns'
import { TaskType } from '../type/type'
import { useDisclosure } from '@chakra-ui/react'
import Modal from './Modal'

type Props = {
    year: number
    month: number
    day: number
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const CalendarCell = ({ year, month, day, tasks, setTasks }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isTod = isToday(new Date(year, month - 1, day))

    const isSat = isSaturday(new Date(year, month - 1, day))

    const isSun = isSunday(new Date(year, month - 1, day))

    let cellClassName =
        'shadow-md rounded-md p-5 text-center cursor-pointer hover:bg-slate-100'
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
                    <button className={cellClassName} onClick={onOpen}>
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
                </>
            ) : (
                <div></div>
            )}
            <Modal
                year={year}
                month={month}
                day={day}
                tasks={tasks}
                setTasks={setTasks}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}

export default CalendarCell
