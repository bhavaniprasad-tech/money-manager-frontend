import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
    const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                // Normalize category objects to ensure `name` field is present
                const raw = response.data;
                console.log('categories', raw);
                const normalized = Array.isArray(raw)
                    ? raw.map((c) => ({
                        ...c,
                        name: c.name ?? c.categoryName ?? c.label ?? "",
                    }))
                    : [];
                setCategoryData(normalized);
            }
        }catch(error){
            console.error('Something went wrong please try again', error)
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

   const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category name is required");
            throw new Error("Validation error");
        }

        const normalizedNewName = name.trim().toLowerCase();

        const isDuplicate = categoryData.some(
            (c) =>
            c.name?.trim().toLowerCase() === normalizedNewName &&
            c.type === type
        );

        if (isDuplicate) {
            toast.error("Category name already exists for this type");
            throw new Error("Duplicate category");
        }

        const response = await axiosConfig.post(
            API_ENDPOINTS.ADD_CATEGORY,
            { name, type, icon }
        );

        toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        fetchCategoryDetails();
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModel(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category Name is Required");
            return;
        }

        if(!id){
            toast.error("Category Id is missing for update");
            return;
        }

        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        }catch(error){
            console.log('Error updating category', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category.")
        }
    }


    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button
                    onClick={() => {
                        setOpenAddCategoryModel(true)
                    }}
                    className="add-btn flex items-center gap-1">
                            <Plus size={15}/>
                            Add Category
                        </button>
                </div>

                {/* Category list */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

                {/* Adding category modal */}
                <Modal 
                isOpen={openAddCategoryModel}
                onClose={() => setOpenAddCategoryModel(false)}
                title= "Add Category"
                >
                    <AddCategoryForm onAddCategory = {handleAddCategory}/>
                </Modal>

                {/* updating category modal */}
                <Modal
                  
                  onClose={() => {
                    setOpenEditCategoryModel(false)
                    setSelectedCategory(null)
                  }}
                  isOpen={openEditCategoryModel}
                  title = "Update Category"
                >
                    <AddCategoryForm
                    initialCategoryData = {selectedCategory}
                    onAddCategory={handleUpdateCategory}
                    isEditing = {true}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Category;