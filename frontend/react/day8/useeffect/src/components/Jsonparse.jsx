import { useEffect, useState } from 'react'

function Jsonparse() {
  const [todos, setTodos] = useState([])
  const [recipes, setRecipes] = useState([])
  const [users, setUsers] = useState([])

  async function getData() {
    const todoRes = await fetch('https://dummyjson.com/todos')
    const todoData = await todoRes.json()
    setTodos(todoData.todos)

    const recipeRes = await fetch('https://dummyjson.com/recipes')
    const recipeData = await recipeRes.json()
    setRecipes(recipeData.recipes)

    const userRes = await fetch('https://dummyjson.com/users')
    const userData = await userRes.json()
    setUsers(userData.users)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="p-5 space-y-8">
      
      <table className="border">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Todo</th>
          </tr>
        </thead>

        <tbody>
          {todos.slice(0, 5).map((item) => (
            <tr key={item.id}>
              <td className="border px-2">{item.id}</td>
              <td className="border px-2">{item.todo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {recipes.slice(0, 3).map((item) => (
          <div key={item.id} className="border p-3 m-2">
            <h2>{item.id}</h2>
            <h2>{item.name}</h2>
            <p>{item.ingredients[0]}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {users.slice(0, 6).map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <h2>{item.firstName}</h2>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Jsonparse