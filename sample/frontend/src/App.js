import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import Footer from './components/Footer';
import { mycontext } from './components/Context';
import Carousel from './components/Carousel';
import React,{useState} from 'react';
import Main from './components/Admin/Main';
import AdminAddProduct from './components/Admin/AdminAddProduct';
import AdminEditProduct from './components/Admin/AdminEditProduct';
import AdminProducts from './components/Admin/AdminProduct';
import AdminPage from './components/Admin/AdminPage';
import Scoops from './components/scoops';
import AdminLogin from './components/Admin/AdminLogin';
import MainPage from './components/Admin/Main';
import MenuPage from './components/Menu';
import ContactForm from './components/Admin/ContactForm';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import { useEffect } from 'react';
import SpecificProductPage from './components/FoodDetails';
import Deals from './components/Deals';
import About from './components/About';
import SearchResults from './components/SearchResults'; 
import Chicking from './components/chicking';
import Buynow from './components/Buynow';
import Scoopscarousel from './components/Scoopscarousel';
import BurgerKing from './components/BurgerKing';
import Bkcarousel from './components/Bkcarousel';
import KFC from './components/KFC';
import Altaza from './components/Altaza';
import Dominospizza from './components/Dominospizza';
import OrderManagement from './components/Admin/User';
import Myorder from './components/Myorders';
import Ban from './components/Ban';
import AdminUser from './components/Admin/User';




function App() {
  const [User, setUser] = useState([]);
  const [userlog, setuserlog] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [token, setToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [specificProduct, setSpecificProduct] = useState({});
 



const [isLoggedIn, setIsLoggedIn] = useState(false);
const items = [
  { id: 1, name: 'Pizza Margherita' },
  { id: 2, name: 'Sushi Roll' },
  { id: 3, name: 'Pasta Carbonara' },
  // Add more items here
];


  const [product, setProduct] = useState({
    category: "",
    restaurantname: "",
    description: "",
    price: "",
    image: "",
    dishname: "",
    rating: "",
    stock:"",
    availbility: "",
  });
  const [addressDetails, setAddressDetails] = useState({
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    addressType: "",
    phone: ""
  });
  
  const [inCart,setInCart] = useState(false)
  const [orders,setOrders] = useState([])
  const [products, setProducts] = useState([]);
  const values = {
    name,setName,
    isLoggedIn,setIsLoggedIn,
    password,setPassword,
    confirmPassword,setConfirmPassword,
    email,setEmail,
    adminEmail, setAdminEmail,
    product,setProduct,
    products, setProducts,
    cartItems,setCartItems,
    specificProduct,setSpecificProduct,
    userToken,setUserToken,
    token,setToken,addressDetails,setAddressDetails,
    orders,setOrders,
    inCart,setInCart,

  }

  console.log("cart",cartItems);
  
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken"); // adjust this according to your setup
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // localStorage.clear()
  return (
    <div className="App">
    <BrowserRouter>
      
    <mycontext.Provider value={values}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/navbar' element={<Navbar/>} />
          <Route path='/banner' element={<Banner/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/featuredrestaurants' element={<FeaturedRestaurants/>} />
          <Route path='/footer' element={<Footer/>} />
          <Route path='/carousel' element={<Carousel/>} />
          <Route path='/adminaddproduct' element={<AdminAddProduct />} />
          <Route path='/adminedit/:productId' element={<AdminEditProduct />} />
          <Route path='/adminproduct' element={<AdminProducts />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/contact' element={<ContactForm/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/main' element={<Main/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/chicking' element={<Chicking/>} />
          <Route path='/burgerking' element={<BurgerKing />} />
          <Route path='/bkcarousel' element={<Bkcarousel />} /> 
          <Route path='/scoops' element={<Scoops/>} />
          <Route path='/scoopscarousel' element={<Scoopscarousel/>} />
          <Route path="/product/:productId" element={<SpecificProductPage />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults items={items} />} />
          <Route path='/buy/:productId' element={<Buynow />} />
          <Route path='/kfc' element={<KFC />} />
          <Route path='/altaza' element={<Altaza/>} />
          <Route path='/dominos' element={<Dominospizza/>} />
          {/* <Route path='/user' element={<OrderManagement /> } /> */}
          {/* <Route path='/getorder' element={<OrderManagement />} /> */}
          <Route path='/myorders' element={<Myorder/>} />
          <Route path='/ban' element={<Ban />} />
          <Route path='/users' element={<AdminUser />} />
          
          

                  
          
          
          
          </Routes>
      </mycontext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
