import { atom, selector } from 'recoil'

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

export type Categories = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
}

export type CategoriesMap = {
    [key: string]: CategoryItem[];
}

export type CategoriesState = {
    readonly categories: Categories[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesState = atom<CategoriesState>({
    key: 'categories',
    default: CATEGORIES_INITIAL_STATE
})

export const categoriesSelector = selector({
    key: 'categoriesSelector',
    get: ({ get }) => {
        const categoriesReducer = get(categoriesState)
        const categories = categoriesReducer.categories
        const isLoading = categoriesReducer.isLoading
        const categoriesMap = categories.reduce((acc, category) => {
            const { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
        }, {} as CategoriesMap)

        return{categoriesReducer, categories, isLoading, categoriesMap}
    }
})