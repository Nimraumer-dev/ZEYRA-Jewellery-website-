// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJnsFMAddIR5V8Vd1lilW4NNWeCuCjHvE",
    authDomain: "zeyra-jewellry.firebaseapp.com",
    projectId: "zeyra-jewellry",
    storageBucket: "zeyra-jewellry.firebasestorage.app",
    messagingSenderId: "842521242809",
    appId: "1:842521242809:web:e470f3c5e613041463ff68",
    measurementId: "G-07L1X0320E",
    databaseURL: "https://zeyra-jewellry-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// --- HELPER FUNCTIONS ---

export const signupUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    return signOut(auth);
};

export const addToCartFirebase = (product) => {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        if (user) {
            const cartRef = ref(db, `carts/${user.uid}`);
            get(cartRef).then((snapshot) => {
                let cart = snapshot.val() || [];
                const existingIndex = cart.findIndex(item => item.name === product.name);

                if (existingIndex > -1) {
                    cart[existingIndex].quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }

                set(cartRef, cart)
                    .then(() => {
                        console.log("Database Sync: Success");
                        resolve();
                    })
                    .catch((err) => {
                        console.error("Database Sync Error:", err.message);
                        reject(err);
                    });
            }).catch((err) => {
                console.error("Database Read Error:", err.message);
                reject(err);
            });
        } else {
            reject("User not logged in");
        }
    });
};

// Export modular methods
export { ref, set, get, onValue, onAuthStateChanged };