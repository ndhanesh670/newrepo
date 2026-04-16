import Banner from "./components/Banner"

const App = () =>{

  const name = "dhanesh"
  const initial = "N"
  const address = "nagar"
  const gpu = "rtx"
  const cpu = "intel"

  const phone = 123456
  const dpi = 3200
  const keys = 61
  const marks = 100
  const count = 10

  const isActive= false
  const isLoggedin= true
  const isLoggedout= false;
  const isVerified= true

  const black= null 

  return(<>

  <h2>{name}</h2>
  <hr />
  <h3>{count}</h3>

  {isLoggedin?"welcome "+name:"Please login"}

  {isVerified && "Verified!! True!!"}

  {black??"black is null"}

  

  

  <Banner/>
  </>)
}

export default App