import { Fragment } from "react";
import {useRecoilValue} from 'recoil'

import { categoriesSelector } from "../../recoil/categories/categories.state";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const {categoriesMap}=useRecoilValue(categoriesSelector)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
      ))}
    </Fragment>
  );
};

export default CategoriesPreview;
