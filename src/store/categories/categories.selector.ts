import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";
import { CategoriesMap } from "./categories.types";

const selectCategoryReducer = (state) :CategoriesState=> state.categories

//createSelector takes 2 args: input selector, output selector
//runs only when the selectCategoryReducer changes
const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories):CategoriesMap => categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
    }, {} as CategoriesMap)
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)