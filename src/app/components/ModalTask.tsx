import React from 'react'
import { TaskType } from '../type/type'

type Props = {
    task: TaskType
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    deleteTask: (id: number) => void
}

const ModalTask = ({
    task,
    inputValue,
    setInputValue,
    setTasks,
    deleteTask,
}: Props) => {
    const [updateValue, setUpdateValue] = React.useState(task.title as string)
    return (
        <>
            <div className="flex mb-2" key={task.id}>
                {task.isEdit ? (
                    <>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md w-full"
                            placeholder="タスクを入力してください"
                            value={updateValue}
                            onChange={(e) => setUpdateValue(e.target.value)}
                        />
                        <div
                            className="shadow rounded p-2 px-3 bg-purple-300 ml-3 w-20"
                            onClick={() => {
                                setTasks((prev) => {
                                    return prev.map((t) => {
                                        if (t.id === task.id) {
                                            return {
                                                ...t,
                                                title: updateValue,
                                                isEdit: false,
                                            }
                                        }
                                        return t
                                    })
                                })
                            }}
                        >
                            更新
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center border border-gray-50 p-2 rounded-md w-full">
                            {task.title}
                        </div>
                        <div
                            className="shadow rounded p-2 px-3 bg-blue-300 ml-3 w-20"
                            onClick={() => {
                                setTasks((prev) => {
                                    return prev.map((t) => {
                                        if (t.id === task.id) {
                                            return {
                                                ...t,
                                                isEdit: true,
                                            }
                                        }
                                        return t
                                    })
                                })
                            }}
                        >
                            編集
                        </div>
                    </>
                )}

                <div
                    className="shadow rounded p-2 px-3 bg-red-300 ml-3 cursor-pointer w-20"
                    onClick={() => deleteTask(task.id)}
                >
                    削除
                </div>
            </div>
        </>
    )
}

export default ModalTask
