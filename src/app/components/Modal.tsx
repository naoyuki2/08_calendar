import React from 'react'
import { TaskType } from '../type/type'

import {
    Modal as ModalWrapper,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react'
import { isSameDay } from 'date-fns'
import ModalTask from './ModalTask'

type Props = {
    year: number
    month: number
    day: number
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    isOpen: boolean
    onClose: () => void
}

const Modal = ({
    year,
    month,
    day,
    tasks,
    setTasks,
    isOpen,
    onClose,
}: Props) => {
    const [inputValue, setInputValue] = React.useState('' as string)
    const [updateValue, setUpdateValue] = React.useState('' as string)

    const todayTask = tasks.filter((task) => {
        return isSameDay(task.date, new Date(year, month - 1, day))
    })

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputValue === '') return onClose()
        setTasks((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                title: inputValue,
                date: new Date(year, month - 1, day),
                isEdit: false,
            },
        ])
        setInputValue('')
    }

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    return (
        <>
            <ModalWrapper isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {year}/{month}/{day} のタスク
                    </ModalHeader>
                    <ModalBody>
                        {todayTask.map((task) => (
                            <ModalTask
                                key={task.id}
                                task={task}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                setTasks={setTasks}
                                deleteTask={deleteTask}
                            />
                        ))}
                    </ModalBody>
                    <hr />
                    <ModalFooter>
                        <form onSubmit={(e) => addTask(e)} className="flex">
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded-md w-full"
                                placeholder="タスクを入力してください"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button className="shadow rounded p-2 px-3 bg-green-300 mx-2 w-20">
                                追加
                            </button>
                            <div
                                className="shadow rounded p-2 px-3 bg-gray-100 ml-2 cursor-pointer w-20"
                                onClick={() => {
                                    setInputValue('')
                                    onClose()
                                }}
                            >
                                閉じ
                            </div>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}

export default Modal
