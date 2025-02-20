import { useState } from "react" 
import { useSignIn } from "../hooks/useLogin";
const Login =  ()=>{
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const { signIn, error, isPending } = useSignIn();
      const [showPass, setShowPass] = useState(false)
      const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
  e.preventDefault();

  const result = await signIn(email, password);
console.log(result)
  if (result.error === "Your mentor account is awaiting approval") {
    setShowModal(true);
  }
};


    return (
      <>
        <div className="">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">Login to your account </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input name="username" type="email" 
                  required
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-green-600" placeholder="Enter user name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" 
                      type={showPass ? "text" : "password"}  // Toggle between text and password  
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-green-600" placeholder="Enter password" />
                  <svg 
                   onClick={() => setShowPass((prev) => !prev)}
                  xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label for="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div> */}

                <div className="text-sm">
                  <a href="jajvascript:void(0);" className="text-green-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                {isPending ? "loggin in" : " login"}
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500">Don't have an account <a href="javascript:void(0);" className="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
          <div className="max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
      {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
              <h2 className="text-lg font-bold text-gray-800">Your account is under review</h2>
              <p className="text-gray-600 mt-2">Your mentor account is awaiting approval. Please wait for confirmation.</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        )}
    </div>
        
        </>
    )
}

export default Login