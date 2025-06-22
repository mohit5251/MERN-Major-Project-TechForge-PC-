import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
})

//Register user
export const registerUser = (user) => {
    return api.post("/register",user,{
      withCredentials: true,
    })
}

//Login User
export const loginUser = (user) => {
    return api.post("/login", user,{
        withCredentials: true,
    })
}

//Auth User
export const fetchAuthData = async () => {
  try {
    const response = await api.get("/authUser", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch authenticated user");
    }
  } catch (error) {
    console.log("Auth error:", error?.response?.data || error.message);
    throw error; // ✅ important so useQuery can catch it
  }
};


//Logout User
export const logoutUser = () => {
  try {
    return api.get("/logout", {
      withCredentials: true,
    })
  } catch (error) {
    console.log(error);
  }
}

//Enter email and get mail with URL Token
export const forgotPassEmail = (email) => {
  return api.post("/forgot-password", email);
}

//Enter new and confirm pass ,verify token and update Password 
export const forgetResetPassword = (token, password) => {
  console.log("token sending: ",token);
  
  return api.post(`/forgot-password/${token}`, password);
}

//Update UserName from profile section
export const updateUserName = (id, userName) => {
    return api.post(`/change-name/${id}`, userName);
}

//Send Email Verification Link
export const sendVerificationLink = () => {
  return api.get("/verify-email", {
    withCredentials: true
  });
}

//Verify Email Verification Link
export const verifyLink = (token,email) => {
  return api.get(`/verify-email-token?token=${token}&email=${email}`, {
    withCredentials: true
  });
}



//insert category Data
export const categoryInsertion = (data) => {
  return api.post("/addCategory", data,{
    withCredentials: true,
     headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

//display Category
export const displayCategory = () => {
  return api.get("/category");
}


//infinite Category Data
export const infiniteCategoryData = async({pageParam = 1}) => {
  const response = await api.get(`/infinteCategory?page=${pageParam}&limit=10`);
  return response.data;  // return only the data part for react-query
}


//Delete category data
export const deleteCategory = (id) => {
  return api.delete(`/deleteCategory/${id}`);
}


//get single category data
export const getSingleCategory = (id) => {
  return api.get(`/getSingleCategory/${id}`);
}


//upadate category data
export const updateCategory = (id, data) =>{
  return api.put(`/updateCategory/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}


//insert Product data
export const insertProduct = (data) => {
  return api.post('/insertProducts', data ,{
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}


//infinite Products display
export const infiniteProducts = async (pageParam, subCategory) => {
  const response = await api.get(`/infinityProducts/${subCategory}?page=${pageParam}&limit=10`);
  return response.data;
};


//infinite Product display AdminPanel
export const infiniteProductsAdmin = async({ pageParam=1 }) => {
  const response = await api.get(`/infinityProductsAdmin?page=${pageParam}&limit=10`);
  return response.data;
}


//Delete Products
export const deleteProducts = (id) => {
  return api.delete(`/deleteProducts/${id}`);
}

//Total no of Products
export const totalProducts = () => {
  return api.get("/totalProducts");
}


//get single product data for UPDATE
export const getSingleProduct = (id) => {
  return api.get(`/getSingleProduct/${id}`);
}

//Update the products
export const updateProducts = (id, data) => {
  return api.put(`/updateProduct/${id}`,data ,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}


//insert pre Build PC
export const insertPC = (data) => {
  return api.post("/insertPC", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}



//Pcs Data display
export const infinitePCs = (pageParam = 1) => {
  return api.get(`/infintePCDisplay?page=${pageParam}&limit=7`);
}


// Delete Pc Data
export const deletePc = (id) => {
  return api.delete(`/deletePc/${id}`);
}

//get Single PC Data
export const getSinglePc = (id) => {
  return api.get(`/getSinglePc/${id}`);
}

//update the pc data
export const updatePc = (id, data) => {
  return api.put(`/updatePc/${id}`, data, {
    headers:{
      "Content-Type": "multipart/form-data",
    },
  })
}



//details Of Product & pcs
export const detailsOfProduct = (name) => {

    //my pc name conatins "/" so have to send EncodedVersion of name
    const encodedName = encodeURIComponent(name);
    
  return api.get(`/details/${encodedName}`);
}



//Display all users
export const displayUser = () => {
  return api.get("/displayUser");
}

//Delete User
export const deleteUser = (id) => {
  return api.delete(`/deleteUser/${id}`);
}


//Get single user Data for Update
export const getSingleUser = (id) => {
  return api.get(`/getSingleUser/${id}`);
}

//Update User data
export const updateUser = (id, data) => {
  return api.put(`/updateUser/${id}`, data);
}


//GlobalSearch
export const searchData = (query) => {
  return api.get(`/search?query=${query}`)
}


//Add to cart 
export const addToCart = (data) => {
  return api.post(`/addToCart`, data,{
    withCredentials: true,
  })
}


//Display cart Data
export const displayCart = () => {
  return api.get("/displayCart",{
    withCredentials: true,
  });
}

//Delete cart item 
export const deleteCartItem = (id) => {
  return api.delete(`/delete-cart-item/${id}`,{
    withCredentials: true,
  })
}

//update cart Quantity
export const updateCart = (itemId, action) => {
  return api.patch(`/update-cart/${itemId}`, {action}, {
    withCredentials: true,
  })
}


//Add Shipping Data
export const addShippingAddress = (data) => {
  return api.post("/add-shipping-address", data, {
    withCredentials: true,
  })
}

//get Shipping data
export const getShippingAddress = () => {
  return api.get("/get-shipping-address", {
    withCredentials: true,
  })
}


//Update Shipping Address
export const updateShippingAddress = (data) => {
  return api.put("/update-shipping-address", data, {
    withCredentials: true,
  })
}



// RazorPay Payment Integration
export const createRazorPayOrder = (amount) => {
  return api.post("/create-order", {amount}, {
    withCredentials: true,
  })
}

//RazorPay Payment Verification
export const verifyPayment = ({razorpay_payment_id, razorpay_order_id, razorpay_signature, totalAmount, paymentMethod}) => {
  return api.post("/payment-verify", {razorpay_payment_id, razorpay_order_id, razorpay_signature, totalAmount, paymentMethod}, {
    withCredentials: true,
  })
}


// Create COD Ordere
export const createCODOrder = (orderData) => {
  console.log(orderData);
  
  return api.post("/order/cod", orderData, {
    withCredentials: true,
  })
}



//Get userWise Orders Data
export const getOrders = () => {
  return api.get("/get-orders",{
    withCredentials: true,
  });
}


//Get all Orders
export const getAllOrders = () => {
  return api.get("/all-orders");
}