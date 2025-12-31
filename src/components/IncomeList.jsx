import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);

    const handleEmail = async () => {
        setLoadingEmail(true);
        try{
            await onEmail();
        }finally{
            setLoadingEmail(false);
        }
    }

    const handleDownload = async () => {
        setLoadingDownload(true);
        try{
            await onDownload();
        }finally{
            setLoadingDownload(false);
        }
    }
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income sources</h5>

                <div className="flex items-center gap-5">
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-md 
                                       bg-gray-200 text-gray-700 
                                       hover:bg-purple-200 hover:text-purple-700 
                                       transition-colors duration-200"
                                                                            disabled = {loadingEmail}
                                                                            onClick={handleEmail}>
                                                {loadingEmail? (
                            <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                              Emailing...
                            </>
                        ): (
                            <>
                             <Mail size={15} className="text-base" />
                             <span>Email</span>
                            </>
                        )}
                    </button>

                                        <button className="flex items-center gap-2 px-3 py-2 rounded-md 
                                       bg-gray-200 text-gray-700 
                                       hover:bg-purple-200 hover:text-purple-700 
                                       transition-colors duration-200"
                                                                            disabled = {loadingDownload}
                                                                            onClick={handleDownload}>
                                                                                {loadingDownload? (
                                                        <>
                                                        <LoaderCircle className="w-4 h-4 animate-spin"/>
                                                            Downloading...
                                                        </>
                                                ): (
                            <>
                             <Download size={15} className="text-base" />
                             <span>Download</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-col-2">
                {/* display the incomes */}
                {transactions && transactions.length > 0 ? (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-500 py-8">
                        No incomes found. Click "Add Income" to create one.
                    </div>
                )}

            </div>
        </div>
    );
};

export default IncomeList;
