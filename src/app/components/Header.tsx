import React from 'react'
import { OneOrMinus } from '../type/type'

type Props = {
    month: number
    year: number
    handleDate: (n: OneOrMinus) => void
}

const Header = ({ month, year, handleDate }: Props) => {
    return (
        <>
            <div className="flex justify-between bg-gray-100 p-4 shadow-md">
                <div
                    className="bg-slate-400 text-white p-2 rounded-md shadow-md hover:bg-slate-300 cursor-pointer"
                    onClick={() => handleDate(-1)}
                >
                    前の月
                </div>
                <div className="p-2 text-xl text-gray-600 font-bold">
                    {year}年{month}月
                </div>
                <div
                    className="bg-slate-400 text-white p-2 rounded-md shadow-md hover:bg-slate-300 cursor-pointer"
                    onClick={() => handleDate(1)}
                >
                    次の月
                </div>
            </div>
        </>
    )
}

export default Header
