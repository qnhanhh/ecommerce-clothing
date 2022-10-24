import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";

import { categoriesState } from "../../recoil/categories/categories.state";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Shop = () => {
  const setState = useSetRecoilState(categoriesState);

  useEffect(() => {
    setState((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const fetchCategories = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            categories: categoriesArray,
          };
        });
      };
      fetchCategories();
    } catch (error) {
      setState((prevState) => {
        return { ...prevState, isLoading: false, error: error as Error };
      });
    }
  }, [setState]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
