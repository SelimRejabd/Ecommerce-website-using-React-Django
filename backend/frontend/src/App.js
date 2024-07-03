import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import Register from "./components/Register";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/usersListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" Component={HomeScreen} exact />
            <Route path="/product/:id" Component={ProductScreen}/>
            <Route path="/cart/:id?" Component={CartScreen}/>
            <Route path="/login" Component={LoginForm}/>
            <Route path="/profile" Component={Profile}/>
            <Route path="/register" Component={Register}/>
            <Route path="/shipping" Component={ShippingScreen}/>
            <Route path="/payment" Component={PaymentScreen}/>
            <Route path="/placeorder" Component={PlaceOrder}/>
            <Route path="/order/:id" Component={OrderScreen}/>
            <Route path="/users" Component={UsersListScreen}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
