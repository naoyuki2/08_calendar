import React from 'react'
import { TaskType } from '../type/type'

type Props = {
    year: number
    month: number
    day: number
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const Modal = ({ setTasks, year, month, day }: Props) => {
    const [inputValue, setInputValue] = React.useState('' as string)

    const handleClick = () => {
        const modal = document.getElementById('my_modal_1')
        if (modal instanceof HTMLDialogElement) {
            modal.close()
        }
        setTasks((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                title: inputValue,
                date: new Date(year, month - 1, day),
            },
        ])
        setInputValue('')
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">タスクを追加</h3>
                <p className="py-4">
                    <input
                        className="shadow rounded border-2 border-gray-300 p-2 w-full"
                        placeholder="タスク名を入力"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </p>
                <div className="modal-action">
                    <button
                        className="btn bg-green-300 hover:bg-green-200"
                        onClick={() => handleClick()}
                    >
                        保存
                    </button>
                    <form method="dialog">
                        <button className="btn bg-rose-300 hover:bg-rose-200">
                            閉じる
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal
