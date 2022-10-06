import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories

//createSelector takes 2 args: input selector, output selector
//runs only when the selectCategoryReducer changes
const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
    }, [])
)
