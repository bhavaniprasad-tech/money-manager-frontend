import { prepareExpenseLineChartData } from "../util/util";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result)

        return () => {};
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                <h5 className="text-lg">
                    Expense Overview
                </h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track your spending over time and analyse your expense trends.
                </p>
                </div>
                <button className="add-btn inline-flex items-center gap-2 transition hover:opacity-90 cursor-pointer"
                    onClick={onAddExpense}>
                    <Plus size={15} className="text-lg"/>
                    Add Expense
                    </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>
        </div>
    )
}

export default ExpenseOverview;
