import { useState } from "react";

const PracticeTasks = () => {
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [click, setClick] = useState(false);
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);
  const [select, setSelect] = useState("");

  return (
    <div
      className={`min-h-screen p-5 ${
        dark ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-md mx-auto bg-white text-black p-5 rounded">
        <h1 className="text-2xl font-bold mb-4">Practice Tasks</h1>

        <h2>{login ? "Logged In" : "Logged Out"}</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          onClick={() => setLogin(!login)}
        >
          {login ? "Logout" : "Login"}
        </button>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded mt-4 block"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
        <p>{show ? "Hello" : ""}</p>

        <button
          className="bg-purple-500 text-white px-3 py-1 rounded mt-4"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Light" : "Dark"}
        </button>

        <input
          className="border p-2 mt-4 w-full"
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <p>{text ? "Typing..." : "Empty"}</p>

        <h2 className="mt-4">{count}</h2>
        <button
          className="bg-orange-500 text-white px-3 py-1 rounded"
          onClick={() => setCount(count + 1)}
        >
          Add
        </button>
        <p>{count % 2 === 0 ? "Even" : "Odd"}</p>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded mt-4"
          onClick={() => setClick(true)}
        >
          {click ? "Button Clicked" : "Click Me"}
        </button>

        <div className="mt-4">
          <input type="checkbox" onChange={() => setCheck(!check)} />
          <p>{check ? "Accepted" : "Not Accepted"}</p>
        </div>

        <input
          className="border p-2 mt-4 w-full"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{password.length > 6 ? "Strong" : "Weak"}</p>

        <button
          className="bg-pink-500 text-white px-3 py-1 rounded mt-4"
          onClick={() => setImage(!image)}
        >
          {image ? "Hide Image" : "Show Image"}
        </button>

        {image ? (
          <img
            className="mt-3 rounded"
            src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
            alt="img"
          />
        ) : (
          ""
        )}

        <select
          className="border p-2 mt-4 w-full"
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JS</option>
        </select>

        <p className="mt-2">
          {select === "html"
            ? "HTML Selected"
            : select === "css"
              ? "CSS Selected"
              : select === "js"
                ? "JS Selected"
                : "Nothing"}
        </p>
      </div>
    </div>
  );
};

export default PracticeTasks;
