import { useEffect, useState } from "react";
import Input from "./input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon:""
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }
        else {
            setCategory({name: "", type: "", icon: ""})
        }
    },[isEditing, initialCategoryData])

    const categoryTypeOptions = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"},
    ]

    const handleChange = (key, value) => {
        setCategory({...category, [key] : value})
    }

    const handleSubmit = async () => {
        console.log('AddCategoryForm: submitting category', category);
        setLoading(true);
        try{
            const res = await onAddCategory(category);
            console.log('AddCategoryForm: onAddCategory returned', res);
        }catch(err){
            console.log('AddCategoryForm: onAddCategory threw', err);
            throw err;
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-7">

            <EmojiPickerPopup
            icon={category.icon}
            onSelect = {(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
            value={category.name}
            onChange={({target}) => handleChange("name", target.value)}
            label="Category Name"
            placeholder="e.g., Freelance, Salary, Groceries"
            type="text"
            />
            <Input
            label= "Category Type"
            value={category.type}
            onChange={({target}) => handleChange("type", target.value)}
            isSelect={true}
            options = {categoryTypeOptions}
            />
            <div className="flex justify-end mt-6">
                <button
                type="button"
                onClick={handleSubmit}
                disabled = {loading}
                className=" bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                        <>
                         <LoaderCircle className="w-4 h-4 animate-spin"/>
                         {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                         {isEditing ? "Updating Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;