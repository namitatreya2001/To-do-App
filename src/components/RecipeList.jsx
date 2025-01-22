import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomRecipes } from '../store/slices/recipesSlice';
import { Loader } from 'lucide-react';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { items: recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRandomRecipes());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-[#74ab77]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">Recipe Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-[#2b2b2b] rounded-lg overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-gray-300 font-medium">{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;