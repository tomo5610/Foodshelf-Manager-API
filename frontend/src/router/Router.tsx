import { Navigate, Route, Routes } from 'react-router-dom';
import { SearchFoodshelf } from '../components/pages/SearchFoodshelf';
import { CreateFoodshelf } from '../components/pages/CreateFoodshelf';
import { FoodshelfDetail } from '../components/pages/FoodshelfDetail';
import { FC } from 'react';
import { NotFound } from '../components/pages/NotFound';
import { HeaderLayout } from '../components/templates/HeaderLayout';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/search' />} />
      <Route path='/search' element={<HeaderLayout><SearchFoodshelf /></HeaderLayout>} />
      <Route path='/create' element={<HeaderLayout><CreateFoodshelf /></HeaderLayout>} />
      <Route path='/update/:id' element={<HeaderLayout><FoodshelfDetail /></HeaderLayout>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};