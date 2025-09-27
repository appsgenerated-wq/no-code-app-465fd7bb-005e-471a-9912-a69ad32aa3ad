import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cookTime: 45 });

  const loadRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Recipe').find({ include: ['author'], sort: { createdAt: 'desc' } });
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleCreateRecipe = async (event) => {
    event.preventDefault();
    try {
      await manifest.from('Recipe').create(newRecipe);
      setNewRecipe({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cookTime: 45 });
      loadRecipes(); // Refresh the list
    } catch (error) {
      console.error('Failed to create recipe:', error);
      alert('Could not create recipe. Please check the form.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FoodApp Dashboard</h1>
            <p className="text-gray-500">Welcome, {user.name}! ({user.role})</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Recipe Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Recipe</h2>
            <form onSubmit={handleCreateRecipe} className="space-y-4">
              <input name="title" type="text" placeholder="Recipe Title" value={newRecipe.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" required />
              <textarea name="description" placeholder="A short description..." value={newRecipe.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" rows="3"></textarea>
              <textarea name="ingredients" placeholder="Ingredients (one per line)" value={newRecipe.ingredients} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" rows="4" required></textarea>
              <textarea name="instructions" placeholder="Cooking instructions" value={newRecipe.instructions} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" rows="5" required></textarea>
              <div className="flex space-x-4">
                <input name="prepTime" type="number" placeholder="Prep Time (min)" value={newRecipe.prepTime} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
                <input name="cookTime" type="number" placeholder="Cook Time (min)" value={newRecipe.cookTime} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors">Add Recipe</button>
            </form>
          </div>

          {/* Recipes List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest Recipes</h2>
            {isLoading ? (
              <p className="text-gray-500">Loading recipes...</p>
            ) : recipes.length === 0 ? (
              <p className="text-gray-500">No recipes found. Add one to get started!</p>
            ) : (
              <div className="space-y-6">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="font-bold text-lg text-gray-900">{recipe.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">by {recipe.author?.name || 'Unknown'}</p>
                    <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
