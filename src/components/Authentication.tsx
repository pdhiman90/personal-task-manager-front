import { useState } from "react";
import {signup,login} from "../API/services.ts"
import { useAuth } from "../context/authContext.tsx";
import { useNavigate } from "react-router-dom";


function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {storeToken} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(formData,"form data");
  const payload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

 
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
   

    // const formData = new FormData(e.currentTarget);
    // const username = formData.get("username");
    // const email = formData.get("email");
    // const password = formData.get("password");
    // const confirmPassword = formData.get("confirmPassword");

    try {
   
      if (!isLogin && payload.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (isLogin) {
        const response = await login(payload);
        const token = response.data.token;
        storeToken(token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/tasks");
      }else{
        console.log(payload ,"payload");
        const response = await signup(payload);
        console.log(response);
        if(response){
          navigate("/tasks");
        }
        const token = response.data.token;
        storeToken(token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(isLogin ? "Logging in" : "Signing up");
        //, {
        //   payload.username,
        //   payload.email,
        //   payload.password,
        // });

      }

    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl transform-gpu bg-white mt-10 mb-10">
        <div className="text-center">
          <i className="fas fa-lock text-3xl mb-4 text-black animate-bounce-subtle"></i>
          <h2 className="text-2xl font-bold text-gray-900 animate-slide-down">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in">
            {isLogin ? "Sign in to your account" : "Sign up for a new account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700 text-sm animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="form-field">
              <label className="block text-start text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required={!isLogin}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black transition-all duration-300 bg-white border-gray-300"
              />
            </div>
          )}

          <div className="form-field">
            <label className="block text-start text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black transition-all duration-300 bg-white border-gray-300"
            />
          </div>

          <div className="form-field">
            <label className="block text-start text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black transition-all duration-300 bg-white border-gray-300"
            />
          </div>

          {!isLogin && (
            <div className="form-field">
              <label className="block text-start text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required={!isLogin}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black transition-all duration-300 bg-white border-gray-300"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <p>Loading...</p>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)
              
            }
            
            className="w-full text-sm text-center transition-colors duration-300 text-gray-600 hover:text-gray-500"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      <style>{`
        .form-field {
          opacity: 0;
          animation: slideIn 0.5s ease forwards;
        }

        .form-field-container {
          height: 0;
          overflow: hidden;
          transition: height 0.3s ease-in-out;
        }

        .form-field-container.expanded {
          height: 80px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        input {
          transition: all 0.3s ease;
        }

        input:focus {
          transform: scale(1.01);
        }

        button {
          transition: all 0.3s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        button:active:not(:disabled) {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}

export default Authentication;


