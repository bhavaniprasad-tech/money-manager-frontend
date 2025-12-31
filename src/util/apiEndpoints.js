export const BASE_URL = "https://money-manager-3cqh.onrender.com/api/v1.0";
//export const BASE_URL = "http://localhost:8081/api/v1.0";
const  CLOUDINARY_CLOUD_NAME = "dgi75nok1"
export const API_ENDPOINTS = {
    LOGIN : "/login",
    REGISTER : "/register",
    GET_USER_INFO : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY : "/categories",
    UPDATE_CATEGORY : (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES : "/incomes",
    CATEGORY_BY_TYPE : (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME : (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/download",
    EMAIL_INCOME: "/incomes/email",

    // Expense endpoints
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/download",
    EMAIL_EXPENSE: "/expenses/email",

    APPLY_FILTERS : "/filter",
    DASHBOARD_DATA : "/dashboard",

    UPLOAD_IMAGE : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}