import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLRS = ["#59168B", "#a0090e", "#016630"]

    const balanceData = [
        { name: "Total Balance", amount: totalBalance},
        { name: "Total Expenses", amount: totalExpense},
        { name: "Total Income", amount: totalIncome}
    ]
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomPieChart
            data={balanceData}
            label = "Total Balance"
            totalAmount = {`₹${addThousandsSeparator(totalBalance)}`}
            colors={COLRS}
            showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;